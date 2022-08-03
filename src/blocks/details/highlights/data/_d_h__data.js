export function WindStatusModel(builderConstructor, container) {
  const builder = new builderConstructor();
  const model = builder
    .updatable(updateData)
    .loadable(showLoader)
    .build();

  model.value = container.querySelector(".d_h__data-value");
  return model;

  function updateData() {
  }
  
  function showLoader() {
  }
}