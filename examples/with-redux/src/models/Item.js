import Immutable from 'immutable';
import timeago from 'timeago.js';

const ItemRecord = Immutable.Record({
    by: "",
    descendants: 0,
    id: null,
    score: 0,
    time: null,
    title: "",
    type: "",
    url: "",
    kids: null
});

export default class Item extends ItemRecord {
    getUrl() {
        if (this.url) {
            return this.url;
        }

        return `/item/${this.id}`;
    }

    getTimeAgo() {
        return timeago().format(new Date(this.time * 1000));
    }
}