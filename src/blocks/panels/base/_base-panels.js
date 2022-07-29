export let basePanels = (() => {

  function swapPanelsClicked(angle) {
    let searchButton = event.currentTarget;
    searchButton.dispatchEvent(
      new CustomEvent("onSwapPanel", 
      {
        bubbles: true, 
        detail: {angle: angle}
      }));
    }

  return {
    swapPanelsClicked: swapPanelsClicked,
  }

})();