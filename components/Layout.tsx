import type { ReactNode } from 'react';
import Link from 'next/link';

export const Layout = ({ children }: { children: ReactNode }) => (
    <main className="container">
        <h1><Link href="/">911</Link></h1>

        <section>
            <h2>If you or someone else are in immediate danger</h2>

            <p>
            Call <a href="tel:911">911</a> if you are able and feel safe doing so. Consider requesting <strong>&ldquo;fire and rescue only&rdquo;</strong> when appropriate (i.e., for behavioral health issues).
            </p>
        </section>

        {children}
    </main>
)
