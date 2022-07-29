import { basePanels } from "$blocks/panels/base/_base-panels.js";

(()=> {
  
  document.querySelector(".sp__swap-panel-button").onclick = () => basePanels.swapPanelsClicked(0);

})();