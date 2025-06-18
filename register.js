function participantTemplate(count) {
    return `
      <section class="participant participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}">First Name</label>
          <input id="fname${count}" type="text" name="fname${count}">
        </div>
        <div class="item activities">
          <label for="activity${count}">Activity #</label>
          <input id="activity${count}" type="text" name="activity${count}">
        </div>
        <div class="item">
          <label for="fee${count}">Fee ($)</label>
          <input id="fee${count}" type="number" name="fee${count}">
        </div>
        <div class="item">
          <label for="date${count}">Desired Date</label>
          <input id="date${count}" type="date" name="date${count}">
        </div>
        <div class="item">
          <p>Grade</p>
          <select name="grade${count}">
            <option value="" selected disabled></option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </section>
    `;
  }
  
  document.getElementById("add").addEventListener("click", function () {
    const container = document.querySelector(".participants");
    const count = container.querySelectorAll("section.participant").length + 1;
    const addButton = document.getElementById("add");
  
    addButton.insertAdjacentHTML("beforebegin", participantTemplate(count));
  });
  
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const participantSections = document.querySelectorAll("section[class^='participant']");
    let totalFees = 0;
    let filledParticipants = 0;
  
    participantSections.forEach((section, index) => {
      let isFilled = false;
  
      const fname = section.querySelector(`input[id^="fname"]`);
      const fee = section.querySelector(`input[id^="fee"]`);
  
      // make sure the info is filled
      if (fname && fname.value.trim() !== "") {
        isFilled = true;
        filledParticipants++;
  
        const feeValue = parseFloat(fee.value);
        if (!isNaN(feeValue)) {
          totalFees += feeValue;
        }
      }
  
      // make sure that the next forms are not required, if not the nect form will be required to fill to submit and last form will not be counted, even if filled.
      //This is required, if not it will cause a little problem :/
      const inputs = section.querySelectorAll("input, select");
      inputs.forEach(input => {
        if (index === 0) {
          input.required = true;
        } else {
          input.required = false;
        }
      });
    });
  
    const adultName = document.getElementById("adult_name").value;
  
    document.querySelector("form").style.display = "none";
    const summary = document.getElementById("summary");
    summary.style.display = "block";
  
    summary.innerText = `Thank you ${adultName} for registering. You have registered ${filledParticipants} participant${filledParticipants !== 1 ? "s" : ""} and owe $${totalFees.toFixed(2)} in Fees.`;
  });
  