export function ForecastModelBuilder() {
  return {
    model: {},

    updatable(updateData) {
      this.model.updateData = updateData.bind(this.model);
      return this;
    },
  
    loadable(showLoader) {
      this.model.showLoader = showLoader.bind(this.model);
      return this;
    },
  
    build() {
      return this.model;
    },
  }
}