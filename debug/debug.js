import { searchService } from "../src/mocks/services/_search.js";

searchService.searchCity("London");
setTimeout(() => searchService.searchCity("Moscow", true), 500);