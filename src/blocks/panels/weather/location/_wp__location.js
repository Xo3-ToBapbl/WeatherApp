export function LocationModel(builderConstructor) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .build();

  model.locationNameElement = document.querySelector(".wp__city");
  return model;

  function updateData(locationName) {
    if (locationName) {
      this.locationNameElement.innerText = locationName;
    }
  }
}