pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                docker pull nginx:latest
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
