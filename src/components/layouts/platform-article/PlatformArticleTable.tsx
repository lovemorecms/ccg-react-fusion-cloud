import type { PlatformArticleTable } from '../../../data/platformArticleContent'

export type PlatformArticleTableBlockProps = {
  table: PlatformArticleTable
}

export function PlatformArticleTableBlock({ table }: PlatformArticleTableBlockProps) {
  const rowHeaderColumn = table.rowHeaderColumn ?? table.headers.length === 2

  return (
    <div className="pa-table-wrap">
      {table.intro ? <p className="pa-article__p pa-table-wrap__intro">{table.intro}</p> : null}
      <div className="pa-table-scroll">
        <table className="pa-table">
          {table.caption ? <caption className="pa-table__caption">{table.caption}</caption> : null}
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, cellIndex) => {
                  if (rowHeaderColumn && cellIndex === 0) {
                    return (
                      <th key={`${cell}-h`} scope="row">
                        {cell}
                      </th>
                    )
                  }
                  return <td key={`${cell}-${cellIndex}`}>{cell}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
