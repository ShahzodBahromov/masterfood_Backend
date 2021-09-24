select 
    o.order_id,
    o.order_created_at,
    t.table_number,
    o.order_paid
    sum(os.price) as order_total_price
    json_agg(os)
from orders o 
natural join tables t
inner join (
    select 
        os.order_set_id,
        os.count,
        os.order_id
        os.order_set_price * os.count as price,
        row_to_json(s)
    from order_sets os
    natural join steaks s
    group by os.order_set_id
) os on os.order_id = o.order_id
group by o.order_id, t.table_number;

select
    distinct on (t.table_id)
    t.table_id,
    t.table_number,
    case
        when o.order_paid = true then false
        else true
    end as table_busy
    case
        when o.order_paid = true then null
        else row_to_json(o)
    end as order
from tables t
inner join (
    select 
        *
    from orders
    order by order-created_at desc
) as o on o.table_id = t.table_id
order by t.table_id;