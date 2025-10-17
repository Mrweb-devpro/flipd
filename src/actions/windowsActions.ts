export async function shareContentAction(shareObjData: {
  title: string;
  text: string;
  url: string;
}) {
  if (navigator.share) {
    try {
      await navigator.share(shareObjData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
