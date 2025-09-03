import { useEffect, useRef, useState } from "react";
import { List, Button, Spin } from "antd";
import { getProducts } from "../util/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetchingRef = useRef(false); // chống double-call trong Strict Mode

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    loadProducts(page).finally(() => (fetchingRef.current = false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadProducts = async (pageNum) => {
    setLoading(true);
    try {
      const res = await getProducts(pageNum, 5); // ✅ đúng endpoint
      // res là { total, page, limit, data }
      const { data: items = [], total = 0, limit = 5 } = res;

      if (items.length === 0) {
        setHasMore(false);
      } else {
        // gộp + khử trùng theo _id
        setProducts((prev) => {
          const map = new Map(prev.map((p) => [p._id, p]));
          items.forEach((it) => map.set(it._id, it));
          return Array.from(map.values());
        });

        const totalPages = Math.ceil(total / limit);
        if (pageNum >= totalPages) setHasMore(false);
      }
    } catch (e) {
      console.error("Lỗi load sản phẩm:", e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách sản phẩm</h2>

      <List
        bordered
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            {item.name} - {item.price}đ
          </List.Item>
        )}
        style={{ marginBottom: 20 }}
      />

      {loading && <Spin />}

      {hasMore && !loading && (
        <Button type="primary" onClick={() => setPage((p) => p + 1)}>
          Xem thêm
        </Button>
      )}

      {!hasMore && <p>Hết sản phẩm.</p>}
    </div>
  );
};

export default HomePage;
