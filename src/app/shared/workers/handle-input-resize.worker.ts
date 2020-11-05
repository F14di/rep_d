/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data.pageX}`;
  console.log(data.resizer);
  // console.log(response)
  // data.resizer(data.pageX, data.pageY)
  // postMessage(response);
});
