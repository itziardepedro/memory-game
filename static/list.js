const List = Object.create(null);

List.reverse = (l) => l.slice().reverse();

List.transpose = (list) => list[0].map(
    (ignore, j) => list.map((l_i) => l_i[j])
);

List.zip = (...lists) => List.transpose(lists);

List.sequence = (n) => Array.from(new Array(n).keys());

export default Object.freeze(List);