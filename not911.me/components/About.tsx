import { City } from "../types";

interface AboutProps {
    city: City;
}

export const About = ({ city }: AboutProps) => (
    <section>
        <header>
            <h2>About</h2>
            <div className="buttons"><a href="#alternative-resources">Back to the top</a></div>
        </header>

        <p>
            <a href="https://not911.me">not911.me</a> is a project of the <a href="https://tech-bloc-sea.dev">Seattle Tech Bloc</a>.
        </p>

        {city.priorArt && <div dangerouslySetInnerHTML={{__html: city.priorArt}} />}

        <p>
            To report any corrections to this site, either fill in the form below, email us at <a href="mailto:techblocsea@protonmail.com">techblocsea@protonmail.com</a>, or message us on <a href="https://twitter.com/TechBlocSEA">Twitter</a>.
        </p>

        <form name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="city_slug" value={city.slug} />
            <p>
                <label>Your Email: <input type="email" name="email" /></label>
            </p>
            <p>
                <label>Message: <textarea name="message"></textarea></label>
            </p>
            <p>
                <button type="submit">Submit correction</button>
            </p>
        </form>

        <p>
            This site is powered by <a href="https://netlify.com" target="_blank" rel="noreferrer">Netlify</a>.
        </p>
    </section>
)
