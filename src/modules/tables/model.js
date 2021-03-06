import { fetch, fetchAll } from "../../lib/postgres.js"

const TABLES = ` 
  SELECT
    DISTINCT ON(t.table_id)
    t.table_id,
    t.table_number,
    CASE
      WHEN o.order_paid = TRUE THEN FALSE
      ELSE TRUE
    END AS table_busy
  FROM tables t
  INNER JOIN (
    SELECT
      *
    FROM orders
    ORDER BY order_created_at DESC
  ) AS o ON o.table_id = t.table_id
  ORDER BY t.table_id
`
const ORDER = ` 
  SELECT 
    o.order_id,
    o.order_created_at,
    t.table_number,
    o.order_id,
    o.order_paid,
    sum(os.price) as order_total_price,
    json_agg(os) order_sets
      FROM orders o 
      NATURAL JOIN tables t
      INNER JOIN (
        SELECT
          os.order_set_id,
          os.count, 
          os.order_id,
          os.order_set_price*os.count price,
          row_to_json(s) steak
        FROM order_sets os
        NATURAL JOIN steaks s 
        GROUP BY os.order_set_id,s.*
  ) os ON os.order_id = o.order_id
  WHERE t.table_id = $1
  GROUP BY o.order_id,t.table_number
  ORDER BY order_created_at DESC;
`

const INSERT_TABLE = `
	INSERT INTO tables (
		table_number
	) VALUES ($1)
	RETURNING *
`

const DELETE_TABLE = `
	DELETE FROM tables
	WHERE table_id = $1
	RETURNING *
`

const tables = () => {
    try {
        return fetchAll(TABLES)
    }catch(error){
        throw error
    }
}
const order = tableId => {
    try {
        return fetchAll(ORDER, tableId)
    } catch(error){
        throw error
    }
}

const insertTable = ({ table_number }) => {
	return db(INSERT_TABLE, table_number)
}

const deleteTable = ({ table_id }) => {
	return db(DELETE_TABLE, table_id)
}

export default {
    tables,
    order,
    insertTable,
    deleteTable
}