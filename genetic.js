// Initial population
// Fitness function
// Selection
// Crossover
// Mutation

class Individual {
    constructor(fast, strong, durable, smart, creative) {
        this.genes = [fast, strong, durable]

        if(this.fitnessScore === this.genes.length) {
            const rand = getRandomInt(0, 2);
            this.genes[rand] = this.genes[rand] ? 0 : 1;
        }
    }

    get fitnessScore() {
        let score = 0;
        this.genes.forEach(gene => score += gene)

        return score
    }

    get chromosome() {
        return this.genes.join('')
    }
}

function getRandomBinary() {
    return Math.round(Math.random())
}

function generatePopulation(count) {
    const population = []

    for(let i = 0; i < count; i++) {
        population.push(new Individual(
            getRandomBinary(),
            getRandomBinary(),
            getRandomBinary(),
            // getRandomBinary(),
            // getRandomBinary(),
        ))
    }

    return population
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectSubjects(population, minimalFitnesScore) {
    let fitestIndividuals = []
    
    for(let item of population) {
        if(item.fitnessScore <= minimalFitnesScore) continue
        fitestIndividuals.push(item)
    }

    let randomSubjectIndex = getRandomInt(0, fitestIndividuals.length - 1)
    let randomSubjectIndex1 = getRandomInt(0, fitestIndividuals.length - 1)


    return [fitestIndividuals[randomSubjectIndex], fitestIndividuals[randomSubjectIndex1]]
}

function selection(population, minimalFitnesScore) {
    let [subjectA, subjectB] = selectSubjects(population, minimalFitnesScore)
}


function crossover(subjectA, subjectB) {

    if(typeof subjectB !== 'object' || typeof subjectB.genes !=='object') debugger
    if(typeof subjectA !== 'object' || typeof subjectA.genes !=='object') debugger
    const crossoverPoint = getRandomInt(1, subjectA.genes.length)

    for(let i = 0; i < crossoverPoint; i++) {

        let temp = subjectB.genes[i]
        subjectB.genes[i] = subjectA.genes[i]
        subjectA.genes[i] = temp
    }

    mutate(subjectA)
    mutate(subjectB)

    return [subjectA, subjectB]
}

function willMutate() {
    return getRandomInt(0, 100) === 1
}

function mutate(subject) {
    subject.genes.map(gene => {
        if(willMutate()) gene = gene ? 0 : 1
    })
}

function computeFitness(subjectA, subjectB) {
    const genesCount = subjectA.genes.length
    return subjectA.fitnessScore === genesCount || subjectB.fitnessScore === genesCount
}

function removeUnfitIndividuals(population, minimalFitnessScore) {
    var i = population.length
    while (i--) {
        if (population[i].fitnessScore <= minimalFitnessScore) {
            population.splice(i, 1)
        }
    }
}

function compare( a, b ) {
    if ( a.fitnessScore < b.fitnessScore ){
      return -1;
    }
    if ( a.fitnessScore > b.fitnessScore ){
      return 1;
    }
    return 0;
  }
  

function evolve(population, callback = () => {}) {
    // START
    // Generate the initial population
    // Compute fitness
    // REPEAT
    //     Selection
    //     Crossover
    //     Mutation
    //     Compute fitness
    // UNTIL population has converged
    // STOP
    let iterations = 0
    let fitnessScore = 0
    // const population = generatePopulation(10)
    while(!fitnessScore && iterations !== 100) {
        let minimalFitness = iterations < 50 ? 1 : 0
        const subjects = selectSubjects(population, minimalFitness)
        
        const crossoverElement = document.createElement('div')
        crossoverElement.classList.add('crossover')
        const el = document.body.appendChild(crossoverElement)

        createBunny(subjects, el, true)
        const offspring = crossover(...subjects)
        // population.sort(compare)
        // population.splice(0, 2)
        // population.push(offspring[0])
        // population.push(offspring[1])
        fitnessScore = computeFitness(...offspring)
        callback(offspring)

        iterations++
    } 
    console.log(`It took ${iterations} generations to evolve to:`)
    console.log(population)
}