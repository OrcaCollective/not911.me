---
layout: default
title: New Resource
stylesheet: /new-resource.css
---

<a href="/">Back to the list</a>

<h2>New Resource Request</h2>

<p>
    Thank you for taking an interest in helping us expand this list of resources. To request a new resource be added, please fill the form below. Please note that the information sent in the form is not private and can be read by our web host, Netlify. There's nothing we can do about this at this time without significantly increasing the cost to run this website. If you'd prefer to contact us directly, please email us at <a href="mailto:techblocsea@protonmail.com">techblocsea@protonmail.com</a>.
</p>

<form name="new-resource" data-netifly="true" method="POST">
    <p>An asterisk (*) denotes a required field</p>
    <p>
        <label for="submitter-email">Your Email (optional):</label>
        <aside>Include this if you feel comfortable with us following up with you about this resource. It is extremely helpful for us to be able to do so and will increase the likelihood that the resource will be included.</aside>
        <input id="submitter-email" type="email" name="submitter-email" />
    </p>
    <p>
        <label class="required">Resource name: <input type="text" required name="name" /></label>
    </p>
    <p>
        <label>Resource URL (if available): <input type="url" name="url" /></label>
    </p>
    <p>
        <label class="required" for="phone">Resource phone:</label>
        <aside>If there are additional phone numbers, please list them in the dscription</aside>
        <input id="phone" type="tel" required name="phone" />
    </p>
    <p>
        <label for="resource-email">Resource email:</label>
        <aside>If available, any contact you have at the organization behind the resource or a general purpose email for the organization</aside>
        <input id="resource-email" type="email" name="resource-email" />
    </p>
    <p>
        <label class="required" for="category">Resource category:</label>
        <aside>Please choose at least one. To select multiple on PC, hold control (or command if on a mac) and click on each option you wish to select.</aside>
        <select id="category" name="category" multiple required>
            {% for resource_type in site.resource_types %}
                <option value="{{ resource_type.slug }}">{{ resource_type.title }}</option>
            {% endfor %}
        </select>
    </p>
    <p>
        <label class="required" for="description">Resource description:</label>
        <aside>If there are additional phone numbers, please list them here</aside>
        <textarea id="description" name="description" required></textarea>
    </p>
    <p>
        <div class="required">Have you vetted this resource for whether they work with the cops?</div>
        <div class="flex-row">
            <input id="vetted-yes" required type="radio" name="vetted" value="yes">
            <label for="vetted-yes">Yes, I have vetted this resource.</label>
        </div>
        <div class="flex-row">
            <input id="vetted-no" required type="radio" name="vetted" value="no">
            <label for="vetted-no">No, I have not vetted this resource.</label>
        </div>
    </p>
    <p>
        <div class="required">If you have vetted the resource, confirm whether the work with the police to the best of your knowledge.</div>
        <div class="flex-row">
            <input id="cops-unknown" required type="radio" name="cops" value="unknown">
            <label for="cops-unknown">I do not know if this resource works with the cops, whether on a regular basis or under specific circumstances.</label>
        </div>
        <div class="flex-row">
            <input id="cops-yes" required type="radio" name="cops" value="yes">
            <label for="cops-yes">Yes, this resource works with the cops under certain circumstances.</label>
        </div>
        <div class="flex-row">
            <input id="cops-no" required type="radio" name="cops" value="no">
            <label for="cops-no">No, this resource does not work with the cops.</label>
        </div>
    </p>
    <p>
        <label class="required" for="why-include">
            If to your knowledge the resource works with the cops, please describe why you feel it would still be a worthwhile inclusion into the list of resources.</label>
        <aside>If you have indicated above that the resource does not work with the cops, please write "not applicable".</aside>
        <textarea required id="why-include" name="why-include"></textarea>
    </p>
    <p>
        <label>Additional notes: <textarea name="notes"></textarea></label>
    </p>
    <p>
        <button type="submit">Submit correction</button>
    </p>
</form>
