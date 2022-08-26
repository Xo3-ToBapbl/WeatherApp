export const requestExecutor = (() => {

  function Response(isSuccess, isAborted, result, error) {
    return {
      isSuccess: isSuccess,
      isAborted: isAborted,
      result: result,
      error: error,

      handle(success=()=>{}, failed=()=>{}, aborted=()=>{}) {
        if (this.isSuccess){
          success(this);
        } else if (this.isAborted) {
          aborted(this);
        } else {
          failed(this);
        }
      }
    }
  }

  return {
    async execute(request) {
      try {

        const response = await request;
        const model = await response.json();

        return new Response(model.isSuccess, false, model.result, model.error);

      } catch (error) {

        console.log(error);
        return new Response(false, error.name == "AbortError", null, error.message)
      }
    }
  }

})();