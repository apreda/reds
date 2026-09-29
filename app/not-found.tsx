import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "100px 20px 140px", textAlign: "center" }}>
      <h1 className="display page-title">Not found</h1>
      <p>That page got traded.</p>
      <Link href="/shop" className="btn" style={{ marginTop: 20 }}>
        Shop all 30
      </Link>
    </div>
  );
}
