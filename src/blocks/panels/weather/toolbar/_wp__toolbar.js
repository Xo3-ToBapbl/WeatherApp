import { basePanels } from "$blocks/panels/base/_base-panels.js";

(()=> {
  
  document.querySelector(".wp__search-button").onclick = () => basePanels.swapPanelsClicked(180);

})();
