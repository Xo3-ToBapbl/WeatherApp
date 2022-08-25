import { basePanels } from "$blocks/panels/base/_base-panels.js";
import { locationService } from "$lib/system/_location";

(()=> {
  
  document.querySelector(".wp__search-button").onclick = () => basePanels.swapPanelsClicked(180);
  document.querySelector(".wp__location-button").onclick = locationService.get;

})();
