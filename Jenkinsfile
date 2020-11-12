pipeline {
    agent any

    stages {
        stage('checkout') {
        steps{
            echo 'Git checkout...'
        }
      }

        stage('Setup') {
            steps {
            bat 'npx cypress verify'
            }
        }
        stage('Execution') {
            steps {
                bat 'node runner.js'
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