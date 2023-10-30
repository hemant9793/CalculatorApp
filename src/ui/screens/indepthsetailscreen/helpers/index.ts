export const createHtmlContent = (emiDetails: any, monthlyBreakup: any) => {
  const emiDetailsHTML = `
    <h1 style="text-align: center;">Emi Details</h1>
    <table>
      <tbody>
        ${emiDetails
          .map(
            (item: any) =>
              `<tr><th>${item.title}</th><td>${item.value}</td></tr>`,
          )
          .join('')}
      </tbody>
    </table>
  `;

  const monthlyBreakupHTML = `
    <h1 style="text-align: center;">Monthly Breakup of EMI</h1>
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Balance</th>
          <th>Interest</th>
          <th>Principal</th>
        </tr>
      </thead>
      <tbody>
        ${monthlyBreakup
          .map(
            (data: any) =>
              `<tr><td>${data.month}</td><td>${data.balance}</td><td>${data.interest}</td><td>${data.principal}</td></tr>`,
          )
          .join('')}
      </tbody>
    </table>
  `;

  // Combine both sections into one HTML string
  const htmlData = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${emiDetailsHTML}
        ${monthlyBreakupHTML}
      </body>
    </html>
  `;
  return htmlData;
};
