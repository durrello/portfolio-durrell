pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                docker pull 'nginx:latest'
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
