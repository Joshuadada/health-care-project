document.getElementById('menu')
    .addEventListener('click', () => {
        document.getElementById('fixed').classList.remove('d-none-lapi');
    })

document.getElementById('close')
    .addEventListener('click', () => {
        document.getElementById('fixed').classList.add('d-none-lapi');
    })

let nextPatientBody = document.getElementById('next-patient-body');
let activitiesBody = document.getElementById('activities-body');
let circleImgContainer = document.getElementById('circle-img-container');
let appointmentNumber = document.getElementById('appointment-number')

const url1 = 'https://612b668c22bb490017893b1d.mockapi.io/health/v1/patients';
const url2 = 'https://612b668c22bb490017893b1d.mockapi.io/health/v1/activites';
fetch(url1)
	.then(response => response.json())
	.then(data => {
        for(let item of data.appointments){
            let nextPatientContainer = document.createElement('div');
            nextPatientContainer.id = 'next-patient-container';
            nextPatientContainer.setAttribute('class', 'd-flex w-100 mb-10');
            let time = document.createElement('div');
            time.setAttribute('class', 'time');
            let nextPatientRight = document.createElement('div');
            nextPatientRight.setAttribute('class', 'd-flex space-between align-center w-100 next-patient-right');
            let patientName = document.createElement('div');
            patientName.setAttribute('class', 'd-flex align-center');
            let nextPatientImg = document.createElement('img');
            nextPatientImg.setAttribute('id', 'next-patient-img');
            let nextPatientName = document.createElement('div');
            nextPatientName.setAttribute('id', 'next-patient-name');
            let threeDots = document.createElement('img');
            threeDots.setAttribute('id', 'three-dot');
            let circleImg = document.createElement('img');
            circleImg.setAttribute('class', 'ml-10-inv');
            

            let d = new Date(item.createdAt);
            let hour, mainHour, minute, timeFrame;
            if(d.getHours() > 11){
                hour = d.getHours() - 12;
                timeFrame = 'pm'
                if(hour <= 9){
                    mainHour = '0' + hour;
                } else {
                    mainHour = hour;
                }
            } else {
                hour = d.getHours();
                timeFrame = 'am'
                if(hour <= 9){
                    mainHour = '0' + hour;
                } else {
                    mainHour = hour;
                }
            }
            if(d.getMinutes() <= 9){
                minute = '0' + d.getMinutes()
            } else {
                minute = d.getMinutes()
            }

            time.textContent = `${mainHour}:${minute}${timeFrame}`;
            nextPatientImg.src = item.avatar;
            nextPatientName.textContent = item.name;
            threeDots.src = '../images/consultant/icons/three-dot.svg'
            circleImg.src = item.avatar;
            

            patientName.appendChild(nextPatientImg);
            patientName.appendChild(nextPatientName);
            nextPatientRight.appendChild(patientName);
            nextPatientRight.appendChild(threeDots);
            nextPatientContainer.appendChild(time);
            nextPatientContainer.appendChild(nextPatientRight);
            
            circleImgContainer.appendChild(circleImg);
            nextPatientBody.append(nextPatientContainer);
        }
        appointmentNumber.textContent = data.appointments.length;

    })
    .catch((err) => {
        console.log(err)
        nextPatientBody.innerHTML = `<p style="text-align: center; color: rgba(255, 0, 0, 0.4)" class="text-16">Oops!!! Data not available, kindly check your internet connection or try later!!!</p>`
    })
    
fetch(url2)
    .then(response => response.json())
    .then(data => {
        for(let item of data.activities){
            let activitiesContainer = document.createElement('div');
            activitiesContainer.setAttribute('class', 'd-flex w-100 align-center mb-20');
            activitiesContainer.id = 'activities-container'
            let activitiesIcon = document.createElement('img');
            activitiesIcon.id = 'activities-icon';
            let activitiesMessage = document.createElement('div');
            activitiesMessage.id = 'activities-message'
            if(item.type == 'report'){
                activitiesIcon.src = '../images/consultant/icons/ready-icon.svg'
            } else if(item.type == 'interview'){
                activitiesIcon.src = '../images/consultant/icons/interview.svg'
            }
            
            activitiesMessage.textContent = item.title;
            activitiesContainer.appendChild(activitiesIcon);
            activitiesContainer.appendChild(activitiesMessage);
            activitiesBody.append(activitiesContainer)
        }
    })
    .catch((err) => {
        console.log(err)
        activitiesBody.innerHTML = `<p style="text-align: center; color: rgba(255, 0, 0, 0.4)" class="text-16">Oops!!! Data not available, kindly check your internet connection or try later!!!</p>`
    })