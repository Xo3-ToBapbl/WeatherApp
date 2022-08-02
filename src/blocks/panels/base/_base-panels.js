export let basePanels = (() => {
  
  return {
    swapPanelsClicked(angle) {
      let searchButton = event.currentTarget;
      let eventToDispatch = new CustomEvent("swapPanel",{bubbles: true,detail: {angle: angle}});
      
      searchButton.dispatchEvent(eventToDispatch);
    }
  }

})();