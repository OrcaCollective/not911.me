import Image from 'next/image';
import type { ResourceDescription } from '../types';

export interface ResourceProps {
    resource: ResourceDescription;
}

export const Resource = ({ resource: { frontmatter: { href, title, mandatory_reporter, phones, email }, content } }: ResourceProps) => (
    <div className="resource">
        <h4><a href={href}>{title}</a></h4>

        <div dangerouslySetInnerHTML={{__html: content }} />

        {mandatory_reporter && (
            <strong>
                Representatives of this resource are <a href="#mandatory-reporters"><em>mandatory reporters</em></a>.
            </strong>
        )}

        <div className="phones">
            {phones?.primary && (
                <>
                    <a href={`tel:${phones.primary.link}`}><Image src="/phone.svg" alt="Call" width={20} height={20}/></a>
                    <a href={`tel:${phones.primary.link}`}>{phones.primary.display}</a>
                </>
            )}
            {phones?.secondary?.map(({ link, display }) => (
                <a key={link} href={`tel:${link}`}>{display}</a>
            ))}
            {email && <a href={`mailto:${email}`}>{email}</a>}
        </div>
    </div>
)
