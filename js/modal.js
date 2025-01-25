// 모달과 버튼 가져오기
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("close");

// 모달 열기
openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// 모달 닫기
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달 외부를 클릭했을 때 닫기
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
