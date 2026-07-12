pipeline {

    agent any

    environment {

        REGISTRY = 'ghcr.io'

        IMAGE_NAME = 'natashajg/mi-app'

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

            steps {

                echo 'Publicando imagen en GitHub Container Registry...'


                withCredentials([
                    string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')
                ]) {


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

        emailext(
            subject: "Pipeline exitoso: ${JOB_NAME} #${BUILD_NUMBER}",
            body: """
            El pipeline se ejecutó correctamente.

            Proyecto:
            ${JOB_NAME}

            Build:
            ${BUILD_NUMBER}

            Estado:
            SUCCESS

            Imagen generada:
            ${IMAGE_TAG}
            """,
            to: 'tachito00king@gmail.com'
        )

    }


    failure {

        echo 'El pipeline fallo'

        emailext(
            subject: "Pipeline fallido: ${JOB_NAME} #${BUILD_NUMBER}",
            body: """
            El pipeline presentó errores.

            Proyecto:
            ${JOB_NAME}

            Build:
            ${BUILD_NUMBER}

            Estado:
            FAILURE

            Revisar consola de Jenkins para más detalles.
            """,
            to: 'tachito00king@gmail.com'
        )

    }


    cleanup {

        echo 'Limpiando recursos Docker'

        bat 'docker image prune -f'

    }

}

}