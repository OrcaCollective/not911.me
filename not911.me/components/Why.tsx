import type { Phone } from '../types';

interface WhyProps {
    nonemergencyPhone: Phone;
}

export const Why = ({ nonemergencyPhone: { link, display }}: WhyProps) => (
    <>
        <section>
            <h2>If you need the police for insurance purposes</h2>

            <p>
                If something of yours is stolen and you need to file a report for insurance or other purposes, consider going to the police station instead of bringing cops into your community. You may inadvertently be putting someone in your neighborhood at risk.
            </p>

            <p>
                If that&apos;s not possible, call the non-emergency line at <a href={`tel:${link}`}>{display}</a>.
            </p>
        </section>

        <details>
            <summary>Why choose alternative resources?</summary>

            <p>
                Below are some alternative resources that will help to lessen the necessity of the police and protect vulnerable populations from state-sanctioned violence.
            </p>
            <p>
                By <strong>reassigning responsibilities</strong>, we can work to delegitimize the police apparatus while building a stronger community run for and by the people. Together we can address issues that arise without criminalizing and harming those who just need help. We will be expanding this list as we receive new information.
            </p>
        </details>
    </>
)
