function queue() {
    class Queue {
        constructor() {
            this.items = {}
            this.frontIndex = 0
            this.backIndex = 0
        }
        enqueue(item) {
            this.items[this.backIndex] = item
            this.backIndex++
            return item + ' inserted'
        }
        dequeue() {
            const item = this.items[this.frontIndex]
            delete this.items[this.frontIndex]
            this.frontIndex++
            return item
        }
        peek() {
            return this.items[this.frontIndex]
        }
        get printQueue() {
            return this.items;
        }
    }
    let queue = new Queue();

    queue.enqueue(23)
    queue.enqueue(20)
    queue.enqueue(32)
    queue.enqueue(11)
    queue.enqueue(2)
    console.log(queue)
    console.log("--------");
    console.log(queue.peek());
    console.log("--------");
    console.log(queue.printQueue);
    console.log("--------");

    console.log(queue.dequeue());
    console.log(queue.dequeue())
    console.log(queue.dequeue())
    console.log(queue.dequeue())
    console.log(queue.dequeue())
 


}
queue()