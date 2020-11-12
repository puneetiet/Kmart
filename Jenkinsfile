pipeline {
    agent any

    stages {
        stage('checkout') {
        steps{
            checkout scm
        }
      }

        stage('Setup') {
            steps {
            bat 'npm install'
            bat 'npx cypress verify'
            }
        }
        stage('Execution') {
            steps {
                bat 'node runParallel.js'
            }
        }
        stage('Report') {
            steps {
                bat "node report.js"
                archiveArtifacts artifacts: 'cypress/results/**/*.*'
            }
        }
    }
}