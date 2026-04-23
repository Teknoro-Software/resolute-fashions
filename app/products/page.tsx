

export default function ProductsPage() {
    return (
        <main>

            <section className="px-8 py-16">
                <h1 className="text-3xl font-bold mb-8">
                    All Products
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border p-4">
                            <div className="h-60 bg-gray-200"></div>
                            <p className="mt-2">Product</p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}