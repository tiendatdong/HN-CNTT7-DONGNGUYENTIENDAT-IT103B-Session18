document.addEventListener("DOMContentLoaded", function () {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let currentPage = 1;
  const itemsPerPage = 10;
  const contactForm = document.getElementById("contactForm");
  const contactTableBody = document.getElementById("contactTableBody");
  const searchInput = document.getElementById("searchInput");
  const pagination = document.getElementById("pagination");
  function displayContacts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm),
    );
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedContacts = filteredContacts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
    contactTableBody.innerHTML = "";
    if (paginatedContacts.length === 0) {
      contactTableBody.innerHTML =
        '<tr><td colspan="4">Không tìm thấy liên hệ nào!</td></tr>';
    } else {
      paginatedContacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>
                        <button class="edit-btn" data-index="${index + startIndex}">Sửa</button>
                        <button class="delete-btn" data-index="${index + startIndex}">Xóa</button>
                    </td>
                `;
        contactTableBody.appendChild(row);
      });
    }
    displayPagination(totalPages);
  }

  function displayPagination(totalPages) {
    pagination.innerHTML = "";
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-btn");
        if (i === currentPage) {
          pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", function () {
          currentPage = i;
          displayContacts();
        });
        pagination.appendChild(pageButton);
      }
    }
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!validateContact(name, phone, email)) {
      return;
    }
    const contactIndex = contactForm.getAttribute("data-index");
    if (contactIndex) {
      contacts[contactIndex] = { name, phone, email };
      alert("Cập nhật liên hệ thành công!");
    } else {
      contacts.push({ name, phone, email });
      alert("Thêm liên hệ thành công!");
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
    contactForm.reset();
    contactForm.removeAttribute("data-index");
    displayContacts();
  });

  function validateContact(name, phone, email) {
    if (name.length < 3) {
      alert("Họ tên phải có ít nhất 3 ký tự!");
      return false;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      alert("Số điện thoại phải là số và có độ dài từ 10 đến 15 ký tự!");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Email phải có định dạng hợp lệ!");
      return false;
    }
    return true;
  }

  contactTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
      const index = event.target.getAttribute("data-index");
      const contact = contacts[index];
      document.getElementById("name").value = contact.name;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("email").value = contact.email;
      contactForm.setAttribute("data-index", index);
    } else if (event.target.classList.contains("delete-btn")) {
      const index = event.target.getAttribute("data-index");
      if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        alert("Xóa liên hệ thành công!");
        displayContacts();
      }
    }
  });

  searchInput.addEventListener("input", function () {
    currentPage = 1;
    displayContacts();
  });
  contactTableBody.addEventListener("click", function (event) {
    if (
      event.target.tagName === "TD" &&
      !event.target.classList.contains("edit-btn") &&
      !event.target.classList.contains("delete-btn")
    ) {
      const index = event.target.parentElement
        .querySelector(".edit-btn")
        .getAttribute("data-index");
      const contact = contacts[index];
      alert(
        `Chi tiết liên hệ:\nHọ tên: ${contact.name}\nSố điện thoại: ${contact.phone}\nEmail: ${contact.email}`,
      );
    }
  });

  displayContacts();
});
// Thêm sự kiện click vào các ô trong bảng để hiển thị chi tiết liên hệ
const contactTableBody = document.getElementById("contactTableBody");
contactTableBody.addEventListener("click", function (event) {
  if (
    event.target.tagName === "TD" &&
    !event.target.classList.contains("edit-btn") &&
    !event.target.classList.contains("delete-btn")
  ) {
    const index = event.target.parentElement
      .querySelector(".edit-btn")
      .getAttribute("data-index");
    const contact = contacts[index];
    alert(
      `Chi tiết liên hệ:\nHọ tên: ${contact.name}\nSố điện thoại: ${contact.phone}\nEmail: ${contact.email}`,
    );
  }
});
// Hiển thị chi tiết liên hệ khi click vào ô trong bảng
const contactTableBodys = document.getElementById("contactTableBody");
contactTableBody.addEventListener("click", function (event) {
  if (
    event.target.tagName === "TD" &&
    !event.target.classList.contains("edit-btn") &&
    !event.target.classList.contains("delete-btn")
  ) {
    const index = event.target.parentElement
      .querySelector(".edit-btn")
      .getAttribute("data-index");
    const contact = contacts[index];
    alert(
      `Chi tiết liên hệ:\nHọ tên: ${contact.name}\nSố điện thoại: ${contact.phone}\nEmail: ${contact.email}`,
    );
  }
});
// Thêm sự kiện click khi xóa liên hệ
contactTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const index = event.target.getAttribute("data-index");
    if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      alert("Xóa liên hệ thành công!");
      displayContacts();
    }
  }
});
