export const dataModels = (() => {
  
  function toggleLoaderFor(model) {
    model.unit.classList.toggle("loader");
    model.value.classList.toggle("loader");
  }

  function updateDataFor(model, value) {
    const valueTextNode = [...model.value.childNodes].find((node) => node.nodeName == "#text");
    valueTextNode.textContent = value;
    model.unit.style.display = "inline";
  }
  
  return {
    windStatusCtor: function WindStatusModel(builderConstructor, container) {
      const builder = new builderConstructor();
      const model = builder
        .updatable(updateData)
        .loadable(showLoader)
        .build();
    
      model.value = container.querySelector(".d_h__data-value");
      model.direction = container.querySelector(".d_h__data-description");
      model.unit = container.querySelector(".d_h__data-value-unit");
      model.toggleLoader = toggleLoader;
      return model;
    
      function updateData(todayForecast) {
        updateDataFor(this, todayForecast.wind)
    
        const directionTextNode = [...this.direction.childNodes].find((node) => node.nodeName == "#text");
        directionTextNode.textContent = todayForecast.windDirection;
    
        this.toggleLoader();
      }
      
      function showLoader() {
        this.toggleLoader();
      }
    
      function toggleLoader() {
        toggleLoaderFor(this);
        this.direction.classList.toggle("loader");
      }
    },

    humidityCtor: function HumidityModel(builderConstructor, container) {
      const builder = new builderConstructor();
      const model = builder
        .updatable(updateData)
        .loadable(showLoader)
        .build();
    
      model.value = container.querySelector(".d_h__data-value");
      model.progressValue = container.querySelector(".d_h__data-progress-bar-inner");
      model.unit = container.querySelector(".d_h__data-value-unit");
      return model;
    
      function updateData(todayForecast) {
        updateDataFor(this, todayForecast.humidity);
    
        this.progressValue.style.width = `${todayForecast.humidity}%`;
    
        toggleLoaderFor(this);
      }
      
      function showLoader() {
        toggleLoaderFor(this);
      }
    },

    visibilityCtor: function VisibilityModel(builderConstructor, container) {
      const builder = new builderConstructor();
      const model = builder
        .updatable(updateData)
        .loadable(showLoader)
        .build();
    
      model.value = container.querySelector(".d_h__data-value");
      model.unit = container.querySelector(".d_h__data-value-unit");
      return model;
    
      function updateData(todayForecast) {
        updateDataFor(this, todayForecast.visibility);
        toggleLoaderFor(this);
      }
      
      function showLoader() {
        toggleLoaderFor(this);
      }
    },

    airPressureCtor: function AirPressureModel(builderConstructor, container) {
      const builder = new builderConstructor();
      const model = builder
        .updatable(updateData)
        .loadable(showLoader)
        .build();
    
      model.value = container.querySelector(".d_h__data-value");
      model.unit = container.querySelector(".d_h__data-value-unit");
      return model;
    
      function updateData(todayForecast) {
        updateDataFor(this, todayForecast.airPressure);
        toggleLoaderFor(this);
      }
      
      function showLoader() {
        toggleLoaderFor(this);
      }
    }
  }
})();