(function () {
  "use strict";
  const config = window.CLINIC_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);

  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
      menuToggle.textContent = open ? "×" : "☰";
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
      });
    });
  }

  $("#year").textContent = new Date().getFullYear();

  const address = $("#clinicAddress");
  const hours = $("#clinicHours");
  const phoneText = $("#clinicPhoneText");
  if (config.address) address.textContent = config.address;
  if (config.hours) hours.textContent = config.hours;
  if (config.phoneDisplay) phoneText.textContent = config.phoneDisplay;

  const waNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const waReady = waNumber.length >= 10 && waNumber !== "201000000000";
  const waLink = waReady
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent("مرحبًا، أود الاستفسار عن الخدمات المتاحة.")}`
    : "#booking";
  const floatingWhatsApp = $("#floatingWhatsApp");
  floatingWhatsApp.href = waLink;
  if (!waReady) {
    floatingWhatsApp.removeAttribute("target");
    floatingWhatsApp.title = "أضف رقم WhatsApp الحقيقي في config.js";
    floatingWhatsApp.setAttribute("aria-label", "أضف رقم WhatsApp الحقيقي في إعدادات الصفحة");
  }

  const dateInput = $("#preferredDate");
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    dateInput.min = localToday;
  }

  $("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#formStatus");
    if (!form.reportValidity()) return;

    if (!waReady) {
      status.textContent = "النموذج تجريبي: أضف رقم WhatsApp الحقيقي في config.js (بالصيغة الدولية دون + أو مسافات) قبل اختبار إرسال الطلب.";
      return;
    }

    const data = new FormData(form);
    const fullName = String(data.get("fullName") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const specialty = String(data.get("specialty") || "").trim();
    const preferredDate = String(data.get("preferredDate") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    // Keep messages administrative. Never ask users to provide diagnosis or sensitive health details.
    const messageLines = [
      `مرحبًا، أود طلب موعد لدى ${config.clinicName || "العيادة"}.`,
      `الاسم: ${fullName}`,
      `رقم التواصل: ${phone}`,
      `الخدمة المطلوبة: ${specialty}`,
      preferredDate ? `اليوم المفضل: ${preferredDate}` : "",
      notes ? `ملاحظة إدارية: ${notes}` : "",
      "أرجو التواصل معي لتأكيد الموعد المتاح. أعلم أن الطلب غير مؤكد حتى ترد العيادة."
    ].filter(Boolean);

    status.textContent = "سيتم فتح WhatsApp برسالة جاهزة. راجع الرسالة وأرسلها بنفسك لتأكيد طلب التواصل.";
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  });
})();
