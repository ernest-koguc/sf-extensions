export function toggleDialog(id: string) {
    const dialog = document.getElementById(id);
    if (!dialog)
      return;

    const modal = dialog as HTMLDialogElement;

  if (!modal.open) {
    modal.showModal();

    return;
  }
  modal.close();
}
