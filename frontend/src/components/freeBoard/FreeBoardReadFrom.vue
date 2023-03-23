<template>
    <div>
      <table class="type09 mt-5 mb-5">
        <thead>
          <tr style="height: 3em;">
            <th colspan="2" scope="cols">
              {{ freeBoard.title }}
            </th>
          </tr>
          <tr style="height: 3em;">
            <td scope="row">
              {{ freeBoard.writer }}
            </td>
            <td scope="row" class="text-right">
              {{ freeBoard.regDate }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 37em;">
            <td colspan="2" scope="row">
              {{ freeBoard.content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
      name: "FreeBoardReadForm",
      props: {
          freeBoard: {
              type: Object,
              required: true,
          }
      }
  }
  </script>
  
  <style>
  table.type09 {
    border-collapse: collapse;
    text-align: left;
    line-height: 1.5;
  
  }
  table.type09 thead th {
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #369;
    border-bottom: 3px solid #036;
  }
  table.type09 tbody th {
    width: 150px;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #f3f6f7;
  }
  table.type09 td {
    width: 350px;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
  }
  </style>