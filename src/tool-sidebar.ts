export function loadFetchTracker() {
  const {fetch: origFetch} = window;
  window.fetch = async (...args) => {
    const response = await origFetch(...args);
    
      response
          .clone()
          .text()
          .then(body => {

              document.dispatchEvent(new CustomEvent("SFHelper_UpdateState", { detail: body }));
          })
          .catch(err => console.error(err));

    return response;
  };
}
