class Fibonacci {
  // generator
  *execute(input, current = 0, next = 1) {
    console.count('execute!');
    if (input === 0) {
      return 0;
    }
    // yield => returna valor sob demanda;
    yield current;
    // yield+ => delega a função, mas não retorna o valor;
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci
