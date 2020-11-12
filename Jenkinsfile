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
            sh 'npm install'
            sh 'npx cypress verify'
            }
        }
        stage('Execution') {
            steps {
                sh 'node runParallel.js'
            }
        }
        stage('Report') {
            steps {
                sh "node report.js"
                archiveArtifacts artifacts: 'cypress/results/**/*.*'
            }
        }
    }
}