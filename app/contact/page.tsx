import {
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-[#faf9f7] min-h-screen">
            <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
    <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-white" />
    </div>

    <div className="relative py-32 text-center px-6">
        <p className="mb-4 text-xs uppercase tracking-[10px] text-zinc-400">
            Resolute Fashions
        </p>

        <h1 className="text-6xl md:text-8xl font-light">
            Contact
        </h1>

        <p className="mt-8 max-w-xl mx-auto text-zinc-400">
            Premium menswear. Personalized service.
            Visit our store or reach out anytime.
        </p>
    </div>
</section>

            <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-20">

                    <div>
                        <h2 className="text-3xl font-light mb-10">
                            Get In Touch
                        </h2>

                        <div className="space-y-10">

                            <div className="flex gap-5">
                                <Phone
                                    size={22}
                                    className="mt-1"
                                />

                                <div>
                                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
                                        Phone
                                    </p>

                                    <a
                                        href="tel:8089081837"
                                        className="text-xl hover:opacity-70"
                                    >
                                        8089081837
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <Mail
                                    size={22}
                                    className="mt-1"
                                />

                                <div>
                                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
                                        Email
                                    </p>

                                    <a
                                        href="mailto:resolutefashions@gmail.com"
                                        className="text-xl hover:opacity-70"
                                    >
                                        resolutefashions@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <MapPin
                                    size={22}
                                    className="mt-1"
                                />

                                <div>
                                    <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
                                        Store Address
                                    </p>

                                    <p className="text-xl leading-relaxed">
                                        Resolute Fashions
                                        <br />
                                        Opposite Second Choice
                                        <br />
                                        Near Malabar Hotel
                                        <br />
                                        Edapazhanji,
                                        Trivandrum
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white p-10 md:p-14 border">
                        <h2 className="text-3xl font-light mb-8">
                            Store Hours
                        </h2>

                        <div className="space-y-6">

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Monday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Tuesday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Wednesday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Thursday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Friday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-4">
                                <span>
                                    Saturday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    Sunday
                                </span>

                                <span>
                                    10 AM - 9 PM
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}