pipeline {

    agent any

    environment {

        REGISTRY = 'ghcr.io'

        IMAGE_NAME = 'NatashaJG/mi-app'

        IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:latest"
    }


    stages {


        stage('Prepare') {

            steps {

                echo 'Preparando entorno...'

                bat 'docker --version'

                bat 'node --version'

                bat 'npm --version'

            }
        }



        stage('Install Dependencies') {

            steps {

                echo 'Instalando dependencias...'

                bat 'npm install'

            }
        }



        stage('Test') {

            steps {

                echo 'Ejecutando pruebas...'

                bat 'npm test'

            }

        }



        stage('Build Docker Image') {

            steps {

                echo 'Construyendo imagen Docker...'

                bat "docker build -t ${IMAGE_TAG} ."

            }

        }



        stage('Push Image') {

            when {

                branch 'main'

            }


            steps {

                echo 'Publicando imagen Docker...'


                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {


                    bat """

                    echo %GITHUB_TOKEN% | docker login ghcr.io -u NatashaJG --password-stdin

                    docker push ${IMAGE_TAG}

                    """

                }

            }

        }



        stage('Verify') {

            steps {

                echo 'Imagen generada correctamente'

                bat "docker images"

            }

        }

    }



    post {


        success {

            echo 'Pipeline completado exitosamente'

        }



        failure {

            echo 'El pipeline fallo'

        }



        cleanup {

            echo 'Limpiando recursos Docker'

            bat 'docker image prune -f'

        }

    }

}