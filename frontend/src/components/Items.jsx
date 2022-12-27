import { useQuery } from "@apollo/client";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_ITEMS } from "../queries/itemQueries";
import ItemCard from "./ItemCard";

const PAGE_DIVIDER = 16;

function Items({ filter }) {
    const { loading, error, data } = useQuery(GET_ITEMS);
    const [filteredItems, setFilteredItems] = useState(null);
    const [idkItems, setIdkItems] = useState(null);

    /* pagination */
    const [page, setPage] = useState(1);
    const handlePageChange = (e, p) => {
        setPage(p);
    };

    const PriceNumber = (price) => {
        return Number(price.replace("Kč", "").replace(" ", ""));
    };

    /* filtrování */
    useEffect(() => {
        if (!loading) {
            setIdkItems([...data.items]);
        }
    }, [loading, filter, page, data]);

    useEffect(() => {
        if (idkItems) {
            if (filter === "nejlevnější") {
                setFilteredItems([
                    ...idkItems.sort((a, b) => PriceNumber(a.price) - PriceNumber(b.price)),
                ]);
            } else if (filter === "nejdražší") {
                setFilteredItems([
                    ...idkItems.sort((a, b) => PriceNumber(b.price) - PriceNumber(a.price)),
                ]);
            } else if (filter === "značka") {
                setFilteredItems([...idkItems.sort((a, b) => a.name.localeCompare(b.name))]);
            }
            console.log(idkItems);
            setFilteredItems(
                [...idkItems].slice((page - 1) * PAGE_DIVIDER, page * PAGE_DIVIDER)
            );
        }
    }, [idkItems]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
            {filteredItems?.length > 0 ? (
                filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
                <p>No items found</p>
            )}
            <Pagination
                color="primary"
                count={Math.ceil(data?.items.length / PAGE_DIVIDER)}
                page={page}
                onChange={handlePageChange}
                sx={{ gridColumn: "1 / -1", margin: "auto", marginTop: "2em" }}
            />
        </>
    );
}

export default Items;
