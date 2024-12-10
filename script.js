// Öğrenci ve Okul Verilerini tutacak diziler
let schoolsData = [];
let studentsData = [];

// Okul kaydı
function registerSchool() {
    const province = document.querySelector('#province').value;
    const district = document.querySelector('#district').value;
    const schoolName = document.querySelector('#school-name').value;
    const schoolPassword = document.querySelector('#school-password').value;

    // Okul bilgilerini kaydediyoruz
    schoolsData.push({ province, district, schoolName, schoolPassword });

    alert('Okul kaydı başarılı! Şimdi öğrenci kaydı yapabilirsiniz.');
    window.location.href = 'student-register.html'; // Öğrenci kayıt sayfasına yönlendiriyoruz
}

// Öğrenci kaydı
function registerStudent() {
    const schoolName = document.querySelector('#student-school-name').value;
    const studentName = document.querySelector('#student-name').value;
    const studentSurname = document.querySelector('#student-surname').value;
    const studentEmail = document.querySelector('#student-email').value;
    const studentPhone = document.querySelector('#student-phone').value;
    const studentClass = document.querySelector('#student-class').value;

    // Öğrenci bilgilerini kaydediyoruz
    studentsData.push({
        schoolName,
        studentName,
        studentSurname,
        studentEmail,
        studentPhone,
        studentClass,
        totalPoints: 0,  // Başlangıçta toplam puan 0
        wasteEntries: [] // Başlangıçta atık verisi yok
    });

    alert('Öğrenci kaydı başarılı!');
    window.location.href = 'index.html'; // Anasayfaya yönlendiriyoruz
}
// Atık türlerine göre puanlar
const wastePoints = {
    'plastik': 10,
    'kağıt': 15,
    'cam': 20,
    'metal': 25,
    'pil': 30,
    'elektronik': 50,
    'tekstil': 5,
    'yağ': 40
};

// Veri girişini yapacak fonksiyon
function recordWaste() {
    const studentName = document.querySelector('#waste-student-name').value;
    const wasteType = document.querySelector('#waste-type').value;
    const wasteWeight = parseFloat(document.querySelector('#waste-weight').value);
    const isSorted = document.querySelector('#waste-sorted').value.toLowerCase() === 'evet';
    const wastePerson = document.querySelector('#waste-person').value;

    // Öğrenciyi buluyoruz
    const student = studentsData.find(s => s.studentName === studentName);

    if (!student) {
        alert('Öğrenci bulunamadı!');
        return;
    }

    // Puan hesaplama
    let points = wastePoints[wasteType] * wasteWeight;

    // Ayrıştırıldıysa ekstra puan ekleniyor
    if (isSorted) {
        points += points * 0.2; // Ayrıştırılmışsa %20 ekstra puan ekleniyor
    }

    // Öğrencinin toplam puanını güncelliyoruz
    student.totalPoints += points;

    // Öğrencinin atık verisini ekliyoruz
    student.wasteEntries.push({
        wasteType,
        wasteWeight,
        points,
        wastePerson,
        isSorted
    });

    alert(`${studentName} için ${points} puan kaydedildi. Toplam Puan: ${student.totalPoints}`);
}
// Unvanlar
const titles = [
    { name: 'Çevre Dostu', minPoints: 100 },
    { name: 'Yeşil Kahraman', minPoints: 250 },
    { name: 'Eko-Öncü', minPoints: 500 },
    { name: 'Süper Çevreciler', minPoints: 1000 }
];

// Öğrencinin unvanını güncelleme
function updateStudentTitle(student) {
    let currentTitle = 'Başlangıç';
    titles.forEach(title => {
        if (student.totalPoints >= title.minPoints) {
            currentTitle = title.name;
        }
    });

    student.currentTitle = currentTitle; // Öğrencinin unvanını atıyoruz
    return currentTitle;
}

// Öğrenci verilerini gösterme ve unvanı güncelleme
function showStudentData() {
    const studentName = document.querySelector('#student-name').value;
    const student = studentsData.find(s => s.studentName === studentName);

    if (student) {
        const currentTitle = updateStudentTitle(student); // Unvanı güncelliyoruz
        let wasteEntriesHtml = student.wasteEntries.map(entry => {
            return `<p>${entry.wasteType}: ${entry.wasteWeight} kg, ${entry.points} Puan, Ayrıştırıldı: ${entry.isSorted ? 'Evet' : 'Hayır'}</p>`;
        }).join('');

        document.getElementById('student-data').innerHTML = `
            <h3>${studentName} - ${currentTitle}</h3>
            <p>Toplam Puan: ${student.totalPoints}</p>
            <h4>Atık Girişleri:</h4>
            ${wasteEntriesHtml}
        `;
    }
}
// Öğrenci verilerini gösterme
document.getElementById('view-student-btn').addEventListener('click', function() {
    showStudentData();
});

// Kredi durumu ve unvan görüntüleme
function showCreditsAndTitles() {
    let creditsHtml = studentsData.map(student => {
        const currentTitle = updateStudentTitle(student); // Unvanı güncelliyoruz
        return `<p>${student.studentName} - ${currentTitle}: ${student.totalPoints} Puan</p>`;
    }).join('');
    
    document.getElementById('credits-list').innerHTML = creditsHtml;
}
// Geri dönüşüm ve ekolojik kredi açıklamaları
function displayRecyclingInfo() {
    document.getElementById('recycling-info').innerHTML = `
        <h3>Geri Dönüşüm Nedir?</h3>
        <p>Geri dönüşüm, atıkların yeniden işlenmesi ve yeni ürünlere dönüştürülmesi sürecidir...</p>
        <h4>Geri Dönüşümü Yapabileceğimiz Maddeler:</h4>
        <ul>
            <li>Plastik</li>
            <li>Kağıt</li>
            <li>Cam</li>
            <li>Metal</li>
            <li>Pil</li>
            <li>Elektronik Atıklar</li>
            <li>Tekstil</li>
            <li>Yağ</li>
        </ul>
        <p>Geri dönüşüm ile doğal kaynakları koruyabilir ve çevreye olan olumsuz etkileri azaltabiliriz...</p>
    `;
}
