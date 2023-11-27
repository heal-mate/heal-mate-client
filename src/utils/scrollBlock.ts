function scrollBlock(status: boolean) {
  if (status) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
}

export default scrollBlock;
