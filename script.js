/* ================================================
   ManCom Strategic Dashboard — Script
   St. Camillus Medical Center · Rebuilt for BSC
   ================================================ */
'use strict';

// ── SCMC BALANCED SCORECARD DATA (from PDF) ────────────────────────────────
const SCORECARD_DATA = {
  financial: {
    label: 'Financial Perspective',
    divisions: {
      'Administrative Division': [
        { so: 'SO1', title: 'Promote cost containment across all departments', kpi: '% reduction in expenses · Monthly supply utilization variance · 50% target', target: '₱200,000/month savings · Increase contingency fund from ₱300K to ₱2M', outcome: 'Lower operational costs without service disruption', corrective: 'Tighten approval controls · Revise consumption limits · Re-audit supply usage · Conserve Energy (Laudato Si)' },
        { so: 'SO2', title: 'Ensure accurate and timely financial reports (Bizbox)', kpi: 'Accuracy rate of financial reports · Audit findings resolved (%) · 80% target', target: '100% data accuracy for 2025', outcome: 'Reliable financial data for decision-making', corrective: 'System recalibration · Additional HIMS training · Repeat internal audit' },
        { so: 'SO3', title: 'Increase collection of receivables and improve cash flow', kpi: 'Collection rate (%) · Average collection period (days) · HMO: 38% on-time, 47% beyond 30 days, 15% on hold', target: '100% collection within 30 days · PhilHealth payments within 30–60 days · 100% No denied claims', outcome: 'Improved cash flow and liquidity', corrective: 'Strengthen follow-up protocols · Apply penalties if applicable · Hold accounts beyond 45 days' },
        { so: 'SO4', title: 'Improve inventory management for availability, quality and cost-effectiveness', kpi: 'Stock-out frequency · Inventory turnover ratio', target: 'Zero critical stock-outs daily · Less emergency procurement · 100% accurate inventory', outcome: 'Uninterrupted hospital operations', corrective: 'Adjust reorder points · Produce 3 suppliers per item · Strictly enforce FIFO/FEFO · Maintain buffer stock' },
        { so: 'SO5', title: 'Achieve growth in Net Profit Margin through partnerships and promotions', kpi: 'Net Profit Margin (%) · No. of corporate accounts', target: 'At least 1 corporate account/month with signed MOA · Additional corporate accounts per quarter', outcome: 'Sustainable revenue growth · Additional revenue', corrective: 'Expand marketing channels · Intensify partnerships · Review pricing packages' },
      ],
      'Ancillary Division': [
        { so: 'SO1.1', title: 'Increase Revenue in Pharmacy Department', kpi: '% Increase in sales', target: '+10–15% increase', outcome: 'Increased department revenue', corrective: 'Monitor sales quarterly; adjust procurement strategy' },
        { so: 'SO1.2', title: 'Reduce Emergency Purchases', kpi: '% reduction in purchases · 70% progress', target: '≥30% reduction', outcome: 'Lower operational costs and continuous supply', corrective: 'Implement Just-In-Time (JIT) system for high-cost, low-turnover items' },
        { so: 'SO1.3', title: 'Stabilize supply of quality medicines', kpi: 'Medicine Availability 60%', target: '≥90% Availability', outcome: 'Consistent access to essential treatments', corrective: 'Implement buffer stocks for critical items; review MOAs' },
        { so: 'SO2.1', title: 'Boost annual revenue (Radiology/Imaging)', kpi: '% Increase in revenue', target: '15–20% increase (CY 2026)', outcome: 'Diversified revenue streams via corporate accounts', corrective: 'Develop bundled imaging packages for APE/Corporate accounts; strengthen internal referral protocols' },
        { so: 'SO2.1.2', title: 'Procure new CT scan machine', kpi: 'Service Sustainability · Monthly utilization rate 70%', target: '100% monthly quota (2026) · Operational service (Ongoing)', outcome: 'High-volume diagnostic throughput · SCMC will earn profit from Bullseye', corrective: 'Finalize rollout of affordable packages; maximize internal referrals. Partnership with Bull\'s Eye materialized.' },
        { so: 'SO3.1', title: 'Expand cardiac services in Heart Station', kpi: '1 New Service Operational · 10% progress', target: '1–2 patients/month · High-tier non-invasive capabilities', outcome: 'Diversified diagnostic portfolio · Increased revenue from advanced diagnostics', corrective: 'Resume IV infusion requisitions; finalize Dobutamine Stress Echo setup. Launch physician orientation.' },
        { so: 'SO4.1', title: 'Increase Revenue in Rehab Department — Grow census and patient retention', kpi: 'Monthly Rehab Revenue 50% · Patient completion rate', target: '+15% Increase in revenue (CY 2026) · 80% completion', outcome: 'Increased departmental profit margin', corrective: 'Implement targeted marketing, improved patient engagement, staff training. Strengthen doctor-to-PT referral.' },
        { so: 'SO5.1', title: 'Expand in-house testing capabilities (Laboratory)', kpi: 'Reduction in send-out tests · 100% achieved', target: 'Completed', outcome: 'Widened test offerings and improved cost efficiency', corrective: 'Shift focus to volume growth and preventive maintenance for the new analyzer' },
        { so: 'SO5.2', title: 'Strengthen partnerships with companies (Laboratory)', kpi: '# of signed service arrangements 30%', target: 'At least 3 partners (Q1–Q3 2026)', outcome: 'Secured back-to-back revenue streams', corrective: 'Finalize APE packages; formalize MOAs with companies along Amang Rodriguez Ave; execute targeted outreach with Marketing' },
      ],
      'Marketing Division': [
        { so: 'SO1', title: 'Ensure efficient utilization of marketing budget', kpi: 'Approved annual marketing budget · Completion of planned activities within budget · Cost efficiency', target: 'Annual budget for CY 2026 · Monthly and quarterly monitoring', outcome: 'Marketing activities executed within budget · Sustainable funding for marketing initiatives', corrective: 'Reassess budget allocation if overspending occurs · Prioritize high-impact, low-cost activities' },
        { so: 'SO1.1', title: 'Ensure cost-efficient promotion of hospital services', kpi: '% of promotional activities completed within budget · Cost per promotional material · Number of services promoted per quarter', target: 'Annual marketing budget CY 2026 · Monthly monitoring', outcome: 'Hospital services consistently promoted without budget overruns', corrective: 'Reduce or redesign high-cost materials · Shift to digital/in-house designs · Reallocate funds upon management approval' },
        { so: 'SO1.2', title: 'Support hospital and community events within budget', kpi: '# of events within approved budget · Actual vs. planned cost · Attendance and engagement levels', target: 'Annual event allocation CY 2026 · Budget monitoring before/after each event', outcome: 'Successful execution of hospital and community events · No overspending', corrective: 'Scale down event expenses without affecting objectives · Prioritize essential event components only' },
        { so: 'SO1.3', title: 'Develop and maintain strategic partnerships', kpi: '# of partnership agreements within budget · Cost per partnership activity · Return on engagement', target: 'At least 1 corporate account/month · Semi-annual review of partnership effectiveness', outcome: 'Strengthened relationships with partner institutions · Increased referrals', corrective: 'Limit partnership expenses to essential activities · Focus on high-value partnerships · Discontinue low-impact partnerships' },
      ],
      'Medical Division': [
        { so: 'SO1', title: 'Increase hospital revenue through pricing optimization', kpi: '% increase in total hospital revenue without decline in census (80%)', target: '+10–15% revenue growth within 12 months · 20% increase in census / 80–90 patients per day', outcome: 'Improved financial sustainability without reduced access to care', corrective: 'Reassess pricing · Introduce flexible payment schemes · Re-benchmark rates' },
        { so: 'SO2', title: 'Update prices of hospital supplies and services', kpi: 'Approved and implemented revised price list (50%)', target: '100% updated within 30 days', outcome: 'Prices aligned with market and operational costs', corrective: 'Phased implementation · Subsidy for vulnerable patients' },
        { so: 'SO3', title: 'Increase ER and in-patient census', kpi: 'Total admissions (80%)', target: 'Admissions ~980 by end of year (+20% = 1,176)', outcome: 'Higher service utilization and revenue', corrective: 'Enhance marketing · Adjust clinic schedules · Recruit consultants' },
        { so: 'SO4', title: 'Increase number of active and visiting consultants', kpi: 'Number of accredited consultants (80%)', target: '+10–20% within 1 year', outcome: 'Expanded service offerings and reduced patient referrals out', corrective: 'Improve PF release system · Strengthen consultant engagement · Improve marketing of doctors using social media' },
        { so: 'SO5', title: 'Increase utilization of hospital packages', kpi: 'Package census and revenue (80%)', target: '+15–20% within 1 year', outcome: 'Improved package uptake and patient affordability', corrective: 'Repackage services · Promotional discounts' },
      ],
      'Nursing Services Division': [
        { so: 'SO1.1', title: 'Minimize cost for recruiting newly hired nurses', kpi: 'Reduce cost per hire · Retention of newly hired nurses >80% within first 12 months · Reliever cost reduction <25%', target: '2nd quarter of 2026 · >50% sources from referrals or school partnership', outcome: 'In-house marketing · In-house medical exam · Stricter hiring requirements', corrective: 'Collaboration with HR in creating guidelines · Create system for training needs assessment · 150-item comprehensive assessment exam created' },
        { so: 'SO1.2', title: 'Standardize the recruitment process', kpi: 'Pre-screening (HR) standard criteria checklist · PRC certifications · Nursing exam · Abstract exam', target: 'Shortlisted applicants 2–3 days · 3rd quarter of 2026', outcome: 'Standardized orientation and deployment · Monthly departmentalized meeting', corrective: 'Passing rate not yet established · Guidelines not established · Lacking personal/behavior assessment' },
      ],
    }
  },
  learning: {
    label: 'Learning & Growth Perspective',
    divisions: {
      'Administrative Division': [
        { so: 'SO1', title: 'Foster continuous learning through structured training and development', kpi: '% staff completing training · No. of trainings conducted · Mentorship and coaching · 40% current rate (Admin: 50, Trainings: 8, Attended: 20)', target: '100% staff completion annually', outcome: 'Improved staff competence and compliance', corrective: 'Mandatory refresher courses · Additional trainings' },
        { so: 'SO2', title: 'Enhance efficiency and quality of talent acquisition', kpi: '% qualified hires · Turnover rate', target: '100% qualified hires', outcome: 'Higher employee retention and performance', corrective: 'Review compensation structure · Improve screening tools' },
        { so: 'SO3', title: 'Ensure proper job alignment based on credentials and skills', kpi: '% employees aligned with skills', target: '100% role alignment', outcome: 'Increased productivity and morale', corrective: 'Reassignment of roles · Job redesign' },
        { so: 'SO4', title: 'Improve work efficiency through structured evaluation and support', kpi: '% employees meeting performance standards', target: '100% rated satisfactory or above by end of July 2026', outcome: 'Continuous performance improvement', corrective: 'Performance Improvement Plans (PIP) · Coaching and mentoring' },
      ],
      'Ancillary Division': [
        { so: 'SO1.1 (Pharm)', title: 'Ensure competent and productive staff at Pharmacy', kpi: '% CPD-compliant staff 60%', target: '≥80% of staff by end of CY 2026', outcome: 'Licensed, high-performing pharmacy team', corrective: 'Early scheduling and management endorsement of trainings' },
        { so: 'SO1.1 (Heart)', title: 'Maintain knowledgeable, skillful, and engaged employees (Heart Station)', kpi: '% staff with updated competencies 50% · Assessment completion rate 0%', target: '≥80% of staff · 100% staff assessment', outcome: 'Expert CVT team capable of advanced imaging', corrective: 'Develop and implement skills assessment tools for all CVTs · Create a competency matrix' },
        { so: 'SO1 (Rehab)', title: 'Maintain competency of all Rehab staff', kpi: 'Satisfaction Score 60% · Trainings per staff 60%', target: 'At least 2 trainings/seminars per year · ≥80% satisfaction', outcome: 'Safe, effective, and high-quality patient care', corrective: 'Address competency gaps through targeted training · Conduct regular check-ins' },
        { so: 'SO1 (Lab)', title: 'Develop and train highly skilled laboratory medical technologists', kpi: '% RMTs with valid certs 80% · Accredited trainings/RMT 85% · Tech-readiness rate 75%', target: '100% (Q1 2027) · 2–3 per RMT/year · 100% trained on new tech', outcome: 'Zero reliever hiring due to compliance gaps · Mastery of emerging lab technologies', corrective: 'Strengthen CPD monitoring · Implement centralized CPD tracking system · Prioritize technology-focused sessions' },
      ],
      'Marketing Division': [
        { so: 'SO1', title: 'Enhance skills and competencies of marketing staff', kpi: 'Number of trainings attended · Quality of marketing outputs · Staff competency development', target: 'Marketing and sales trainings for CY 2026 · Continuous professional development', outcome: 'Improved marketing strategies · Increased staff productivity · Higher quality campaigns', corrective: 'Identify skill gaps · Schedule targeted trainings · Evaluate training impact' },
      ],
      'Medical Division': [
        { so: 'SO1', title: 'Improve staff efficiency and productivity', kpi: '% staff completing CPD or training programs ≥80% participation · 100% target', target: '≥80% participation yearly', outcome: 'More competent and motivated workforce', corrective: 'Mandatory training plans · Annual update of doctor credentialing' },
        { so: 'SO2', title: 'Retain qualified and talented staff', kpi: 'Employee retention rate (OPD nurses and NA) ≥90% annually', target: '100% target', outcome: 'Workforce stability and continuity of care', corrective: 'Review compensation · Enhance recognition programs' },
        { so: 'SO3', title: 'Establish succession and recognition programs', kpi: 'Presence of approved programs', target: 'Programs implemented within 1 year', outcome: 'Leadership continuity and staff motivation', corrective: 'Revise criteria · Expand incentives' },
      ],
      'Nursing Services Division': [
        { so: 'SO1', title: 'Empowerment of nursing workforce — Increase retained tenured nurses', kpi: 'Reduce nurse burnout by 20% annually · Reduce overall turnover <25% per year · Top 15–20% employees identified quarterly', target: '2nd quarter 2026: IVT, BLS/ACLS, infection control · 3rd quarter: mentorship and succession · 4th quarter: standardized protocols', outcome: '100% nurses complete at least 1 competency-based training annually · >70% supervisory positions filled internally', corrective: 'Accomplished: 78% tenured nurses retained 2025 (9 resigned) · 80% retained employees as of 2025 · Problem: High compensation demand from other institutions · Initiative: Monthly training' },
        { so: 'SO1.2', title: 'Reduce high turnover and keep high-performing employees', kpi: 'High performers identified', target: '3rd quarter: Monitor turnover trends, focus on preventable resignations, reduce 1st year resignation to 15–20% · 4th quarter: Clear promotion pathways', outcome: 'Competency-based advancement · Succession planning for key roles · Quarterly recognition of high performers', corrective: 'Accomplished: Recognition of nurses with certificates and tokens · Problem: Lack of appropriate criteria in selecting candidates' },
        { so: 'SO2', title: 'Competent and skillful nursing staff — Decrease sentinel events', kpi: 'Ensure 100% of specialty unit nurses scheduled for unit-relevant trainings · Decreased incidents of near miss', target: '3rd quarter 2026: Annual competency assessment, reduce clinical skill-related incidents by 20% annually', outcome: '80% competency compliance rate in core nursing procedures · Conduct at least 2 specialized training programs per year per unit', corrective: 'Accomplished: Baseline data established from 2025 sentinel events · In-house training in ER, OR, ICU · IPC, Dialysis, NB Screening certifications provided · Problem: Individual perspective differences, required constant supervision' },
      ],
    }
  },
  internal: {
    label: 'Internal Business Process Perspective',
    divisions: {
      'Administrative Division': [
        { so: 'SO1', title: 'Improve efficiency in transmittal of PhilHealth claims', kpi: 'Claims submitted on time · Dialysis/OPD 30 days · OECB 45–60 days · In-Patient 45–60 days · Rehab 45–60 days', target: 'Corporate deadline of 7 days instead of 60 days', outcome: 'Faster reimbursement and reduced denials', corrective: 'Staff retraining · Checklist enforcement · Computer literacy · Seminars with PhilHealth' },
        { so: 'SO2', title: 'Maintain compliance with financial obligations to suppliers and physicians', kpi: '% on-time payments · Total: ₱78,447,242.91 · Payments: ₱48,884,982.14 (62%) · Payables: ₱29,562,260.77 (38%)', target: '100% compliance for next 3 years (2026–2028) for previous years credit · Current paid on time', outcome: 'Maintained supplier and physician trust', corrective: 'Renegotiate terms · Set payment schedules' },
        { so: 'SO3', title: 'Improve cycle time across hospital services and processes', kpi: 'Admission processing time (minutes)', target: 'Within 2 hours TAT from time patient was ordered for admission', outcome: 'Faster patient service delivery', corrective: 'Workflow redesign · Evaluate 13-page documentation to streamline · Review all admitting forms' },
        { so: 'SO4', title: 'Establish robust data management and quality control frameworks', kpi: 'Data accuracy rate · No. of data incidents', target: '100% data accuracy', outcome: 'Secure and reliable records', corrective: 'Strengthen access controls · Conduct data audits' },
      ],
      'Ancillary Division': [
        { so: 'SO1.1 (Pharm)', title: 'Ensure accurate data on stock of medicine', kpi: 'Discrepancy rate between physical vs. system count · Frequency of stockouts · Number of inventory checks 80%', target: 'Ongoing · 100% stock accuracy; zero preventable expirations', outcome: 'Early detection of variances · Reduced end-of-month workload', corrective: 'Implement Perpetual Inventory System · Weekly cycle counts for high-value meds · Enforce FEFO · Formalize weekly cycle count schedule' },
        { so: 'SO1.3 (Pharm)', title: 'Monitor medicines based on stock levels', kpi: 'Stockout frequency · Lead time accuracy 90%', target: 'Zero stockouts of critical and fast-moving medicines', outcome: 'Lean inventory with zero stockouts of critical items', corrective: 'Monitor critical level · Adjust reorder points monthly based on seasonal trends' },
        { so: 'SO1 (Heart)', title: 'Reliable diagnostic equipment & minimize service interruptions', kpi: 'Equipment Uptime (%) · Number of unscheduled breakdowns · PMS compliance rate 100% completed on 2025', target: 'Bi-Annual 100% audit', outcome: 'Uninterrupted patient services · Extended equipment lifespan · Certified diagnostic accuracy', corrective: 'Standardize the Preventive Maintenance Schedule (PMS) · Service contracts with suppliers maintained · Comprehensive equipment audits conducted routinely' },
        { so: 'SO1.1 (Dietary)', title: 'Monitor inventory turnover rate for food items', kpi: 'Replenishment Rate 50%', target: '100% Timely Replenishment', outcome: 'Minimized food waste and zero stockouts of essential items', corrective: 'Train designated staff for digital encoding · Dietitian-led supervision of monitoring' },
        { so: 'SO1.2 (Dietary)', title: 'Implement automated meal planning and inventory systems', kpi: 'System Implementation 50% · Nutritional Alignment 50% · % of diets with recipes 50%', target: 'Full Excel/Software Rollout · ≥90% (Q2 2026)', outcome: 'Streamlined meal planning and automated stock alerts · Consistent nutritional output', corrective: 'Gradually rollout system · Train two "Super-Users" · Finalize standardized recipe cards for therapeutic diets' },
      ],
      'Marketing Division': [
        { so: 'SO1', title: 'Strengthen marketing processes for compliance, consistency and promotion', kpi: 'Completion of required marketing outputs · Compliance with DOH requirements · Timely execution of marketing projects', target: 'Organizational charts for DOH compliance · Installation of signage · Completion of AVPs and promotional videos', outcome: 'Improved visibility of hospital services · DOH compliance · Streamlined marketing workflow', corrective: 'Re-align timelines · Address approval delays · Improve coordination with departments' },
      ],
      'Medical Division': [
        { so: 'SO1', title: 'Improve patient flow and reduce waiting time', kpi: 'Average patient waiting time (Registration Time) (70%)', target: '20–30% reduction within 1 year', outcome: 'Faster, smoother patient experience', corrective: 'Process re-mapping · Additional registration staff' },
        { so: 'SO2', title: 'Implement streamlined patient processes', kpi: 'Compliance with standardized flow', target: '100% compliance within 1 year', outcome: 'Predictable and efficient service delivery', corrective: 'Monthly monitoring · Corrective coaching' },
      ],
      'Nursing Services Division': [
        { so: 'SO1', title: 'Standard learning outcome and syllabus — Increase nursing staff competency', kpi: 'Ensure 100% of nurses in specialty units meet required competency · Achieve >80% staff participation for internal trainings · Ensure 100% compliance with mandatory trainings', target: '2nd quarter: Reduce skill-related errors by 20% annually · 4th quarter: Strengthen mentorship · 1st quarter: 100% of newly hired nurses complete required internal trainings · 3rd quarter: Utilize internal preceptors for ≥50% of training', outcome: '80% competency compliance rate in core nursing procedures · Reduce skill-related incidents by 20% annually · Provide regular skills enhancement refresher training with >90% participation', corrective: 'Accomplished: Alignment of evaluation performance tools · Supervisor evaluation tools and checklist · Problem: Lack of post evaluation tools · Lack of participation of rank and file · Initiative: Included in schedule · Collaboration with HRD in planning internal training procedures' },
      ],
    }
  },
  customer: {
    label: 'Customer Satisfaction Perspective',
    divisions: {
      'Administrative Division': [
        { so: 'SO1', title: 'Promote faster yet high-quality transactions across all hospital departments', kpi: 'Turnaround Time (TAT) · No. of complaints · DOH complaints (Rosfel Dela Cruz, Kenjie Francisco Jr, Victor Dax Jose) · Inconsistent submission of Patient Satisfactory Survey', target: 'Cash: 2 hours from MGH order · HMO: 4 hours from MGH order', outcome: 'Faster and smoother patient transactions', corrective: 'Process re-orientation · Add frontline staff · Inform HMO patient once charges checked · Emphasize Cut-off time: HMO 12nn, Cash 3pm' },
        { so: 'SO2', title: 'Provide institutional activities and services to improve patient engagement', kpi: 'Patient satisfaction score', target: '100% satisfaction rating', outcome: 'Improved patient trust and loyalty', corrective: 'Staff values formation · Service behavior coaching' },
        { so: 'SO3', title: 'Avoid duplication of patient charts and promote consistent patient identification', kpi: '% duplicate patient charts', target: '0% duplication', outcome: 'Reliable patient identification', corrective: 'Enforce unique patient ID · Retrain registration staff' },
        { so: 'SO4', title: 'Enhance patient satisfaction through continuous feedback and improvement', kpi: 'Client Experience Survey score', target: 'Year-on-year score increase · 100% monitoring and reporting every Mancom meeting', outcome: 'Enhanced patient experience', corrective: 'Implement service improvements · Continuous feedback reviews' },
      ],
      'Ancillary Division': [
        { so: 'SO1.2', title: 'Enhance quality of service (Ancillary)', kpi: 'Standardize service protocols; improve patient experience 50%', target: '100% (Q1–Q4 2026)', outcome: 'Consistent, high-quality patient experiences', corrective: 'Standardize service protocols and monitor staff adherence' },
        { so: 'SO2.1 (Lab)', title: 'Deliver Exceptional Customer Service — Upgrade equipment', kpi: 'Critical equipment status 80%', target: '100% (Q4 2026)', outcome: 'Expanded test menu and safety compliance', corrective: 'Finalize staff training · Complete resin flooring and eyewash installation' },
        { so: 'SO2.1.2 (Lab)', title: 'Reduce turnaround time of laboratory tests', kpi: 'Standard TAT achievement 80%', target: '≤ Standard TAT (Q4 2026)', outcome: 'Rapid result delivery for clinical decisions', corrective: 'Implement final TAT protocols immediately following expansion completion' },
        { so: 'SO2.3 (Lab)', title: 'Monitor patient retention and returning patients', kpi: 'Patient return rate 80%', target: '≥70% return rate (Q4 2026)', outcome: 'Sustained revenue and longitudinal patient care', corrective: 'Develop a systematized tracking system for follow-up analysis' },
      ],
      'Marketing Division': [
        { so: 'SO1', title: 'Increase patient and client awareness of SCMC services and strengthen partnerships', kpi: 'Engagement and reach of social media postings · Number of partnerships renewed or established · Utilization of loyalty care card perks', target: 'Weekly and monthly DOH Health Celebration postings (2025–2026) · Secure at least 3 partnerships per month', outcome: 'Increased awareness of SCMC services · Improved patient loyalty · Strong and sustained partnerships', corrective: 'Enhance content strategy · Conduct follow-ups with partners · Improve promotional offers' },
      ],
      'Medical Division': [
        { so: 'SO1', title: 'Enhance patient experience through CQI', kpi: 'Patient satisfaction score (50%)', target: '≥90% satisfaction, monitored daily', outcome: 'Improved trust and hospital reputation', corrective: 'Immediate service recovery · Staff reorientation' },
        { so: 'SO2', title: 'Increase patient loyalty', kpi: 'Repeat visit rate (50%)', target: '10–20% annually', outcome: 'Sustained patient base and referrals', corrective: 'Improve loyalty rewards · Enhance service consistency · Perks' },
      ],
      'Nursing Services Division': [
        { so: 'SO1', title: 'High quality nursing and patient centered care — Increase customer feedback', kpi: 'Reduce Nursing-related adverse events (falls, medication errors, pressure injuries) by 20% annually · Achieve >80% patient satisfaction score · Ensure 100% compliance with patient-centered care standards', target: '2nd quarter and 3rd quarter of 2026', outcome: 'Increased positive patient feedback · Increased return of repeated patients', corrective: 'Accomplished: Significant decrease in number of complaints to NSD · Problem: Required constant supervision · Initiative: Facilitate training in customer service/handling skills' },
        { so: 'SO1.2', title: 'Monthly audit with collaboration with QA', kpi: 'Utilize audit results for targeted trainings · Ensure 100% audit findings documented', target: '1st quarter of the month · 2nd quarter of 2026 · Conduct regular monthly departmental audit', outcome: 'Compliance with hospital policies · Nursing standards and patient safety protocols', corrective: 'Accomplished: Monthly audit in NSD · Problem: Least priority with QA collaboration · Initiative: Initiate collaboration with HRD and QA' },
        { so: 'SO2', title: 'Customer recognition and brand name — Partnership with CREL and Social Services', kpi: 'Improve patient satisfaction >90% · Reduce patient complaints by 20% annually · Achieve repeat patient rate >50%', target: '3rd quarter and 4th quarter of 2026', outcome: 'Improve staff brand ambassadorship · 100% compliance in use of approved branding materials', corrective: 'Accomplished: Financial constraint patients referred to social services · Problem: Lack of funding for NSD uniform, deactivation of CREL, lack of fund · Initiative: Strengthen coordination with Social Services' },
        { so: 'SO3', title: 'Improvement of resilient NSD — Decrease the number of incidents and near misses', kpi: 'Reduce nursing staff turnover by 20% annually · Conduct annual resilience and mental health support sessions · Achieve >90% positive scores in staff satisfaction surveys', target: '4th quarter of 2026', outcome: 'Improve nurse retention · Strengthen emotional and mental well-being · Promote supportive work environment', corrective: 'Accomplished: Baseline data established from 2025 sentinel events · Implement needle stick reporting · Monthly SOP updates · Problem: Absence of baseline data · Initiative: Training on proper reporting and documentation' },
      ],
    }
  }
};

const PERSPECTIVE_LABELS = {
  financial: 'Financial',
  learning:  'Learning & Growth',
  internal:  'Internal Process',
  customer:  'Customer Satisfaction'
};

const DIVISION_ABBR = {
  'Administrative Division': 'Admin',
  'Ancillary Division':       'Ancillary',
  'Marketing Division':       'Marketing',
  'Medical Division':         'Medical',
  'Nursing Services Division':'Nursing'
};

// ── STATE ─────────────────────────────────────────────────────────────────
let operations      = [];
let scorecardProgress = {}; // { [soKey]: { progress, status, comments } }
let editingId       = null;
let deleteTargetId  = null;
let sortCol         = 'createdAt';
let sortDir         = 'desc';
let renderDebounce  = null;
let chartView       = 'weekly';
let currentSection  = 'dashboard';

let progressChart    = null;
let donutChart       = null;
let deptChart        = null;
let urgencyChart     = null;
let avgProgressChart = null;
let perspChart       = null;
let perspStatusChart = null;
let chartInitialized = false;

// ── SECTION NAVIGATION ───────────────────────────────────────────────────
function showSection(name, el) {
  currentSection = name;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const t = document.getElementById(`section-${name}`);
  if (t) t.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el && el.classList && el.classList.contains('nav-item')) {
    el.classList.add('active');
  } else {
    document.querySelectorAll('.nav-item').forEach(n => {
      if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(`'${name}'`)) n.classList.add('active');
    });
  }

  setBottomNav(name);
  const titles = {
    dashboard:'Dashboard', scorecard:'Balanced Scorecard',
    financial:'Financial Perspective', learning:'Learning & Growth',
    internal:'Internal Process', customer:'Customer Satisfaction',
    objectives:'All Objectives', analytics:'Analytics',
    add: editingId ? 'Edit Objective' : 'Add Objective'
  };
  const el2 = document.getElementById('pageTitle');
  if (el2) el2.textContent = titles[name] || name;

  if (['financial','learning','internal','customer'].includes(name)) renderPerspectiveSection(name);
  if (name === 'scorecard')  renderScorecard();
  if (name === 'analytics')  setTimeout(() => { updateDeptChart(); updateUrgencyChart(); updateAvgProgressChart(); updatePerspChart(); updatePerspStatusChart(); }, 50);

  closeSidebarIfMobile();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

function setBottomNav(name) {
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
  const a = document.getElementById(`bnav-${name}`);
  if (a) a.classList.add('active');
}
function toggleSidebar() {
  const s = document.getElementById('sidebar'), o = document.getElementById('sidebarOverlay');
  const open = s.classList.toggle('open');
  o.classList.toggle('hidden', !open);
}
function closeSidebarIfMobile() {
  if (window.innerWidth <= 1024) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.add('hidden');
  }
}

// ── DARK MODE ────────────────────────────────────────────────────────────
function initDarkMode() {
  if (localStorage.getItem('mancom-dark') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkIcon').setAttribute('data-lucide','sun');
    document.getElementById('darkLabel').textContent = 'Light Mode';
    lucide.createIcons();
  }
}
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('mancom-dark', isDark);
  document.getElementById('darkIcon').setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  document.getElementById('darkLabel').textContent = isDark ? 'Light Mode' : 'Dark Mode';
  lucide.createIcons();
  [progressChart, donutChart, deptChart, urgencyChart, avgProgressChart, perspChart, perspStatusChart].forEach(c => { if (c) c.destroy(); });
  progressChart = donutChart = deptChart = urgencyChart = avgProgressChart = perspChart = perspStatusChart = null;
  chartInitialized = false;
  scheduleRender();
}

// ── TOAST ────────────────────────────────────────────────────────────────
function showMsg(msg, type = 'success') {
  const icons = { success:'check-circle', error:'x-circle', info:'info' };
  const c = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i data-lucide="${icons[type]||'info'}" style="width:16px;height:16px;flex-shrink:0"></i> ${msg}`;
  c.appendChild(el);
  lucide.createIcons({ nodes:[el] });
  setTimeout(() => el.remove(), 3200);
}

// ── HELPERS ──────────────────────────────────────────────────────────────
function setDefaultDates() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('timeFrame').value = now.toISOString().slice(0,16);
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('deadline').value = tomorrow.toISOString().slice(0,16);
}
function fmtDate(str)     { return new Date(str).toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
function fmtDateFull(str) { return new Date(str).toLocaleString('en-US',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}); }
function csvField(v)      { const s = v==null?'':String(v); return `"${s.replace(/"/g,'""')}"`; }
function progressClass(p) { if(p>=100)return'complete'; if(p>=60)return'high'; if(p<30)return'low'; return''; }
function getChartColors() {
  const dark = document.body.classList.contains('dark');
  return { grid: dark?'#334155':'#e2e8f0', text: dark?'#94a3b8':'#64748b', bg: dark?'#1e293b':'#ffffff' };
}
function syncProgress(val) {
  const v = Math.min(100,Math.max(0,parseInt(val)||0));
  document.getElementById('progress').value = v;
  document.getElementById('progressDisplay').textContent = v+'%';
  document.getElementById('progressRange').value = v;
}

// ── DELETE MODAL ─────────────────────────────────────────────────────────
function openDeleteModal(id) {
  deleteTargetId = id;
  const op = operations.find(o => o.id===id);
  document.getElementById('deleteModalMsg').textContent = op ? `Delete "${op.operationTask}"? This cannot be undone.` : 'Are you sure?';
  document.getElementById('deleteModal').classList.remove('hidden');
  lucide.createIcons();
}
function closeDeleteModal() { deleteTargetId=null; document.getElementById('deleteModal').classList.add('hidden'); }

// ── TABLE SORT ───────────────────────────────────────────────────────────
function sortTable(col) {
  sortDir = sortCol===col ? (sortDir==='asc'?'desc':'asc') : 'asc';
  sortCol = col;
  document.querySelectorAll('.sort-icon').forEach(e => { e.textContent='↕'; e.classList.remove('asc','desc'); });
  const icon = document.querySelector(`.sort-icon[data-col="${col}"]`);
  if (icon) { icon.textContent = sortDir==='asc'?'↑':'↓'; icon.classList.add(sortDir); }
  renderTable();
}

function getSortedFiltered() {
  const search = (document.getElementById('searchInput')?.value||'').toLowerCase().trim();
  const fStatus = document.getElementById('filterStatus').value;
  const fUrgency= document.getElementById('filterUrgency').value;
  const fDept   = document.getElementById('filterDepartment').value;
  const fPersp  = document.getElementById('filterPerspective').value;

  let list = operations.filter(op => {
    const ms = !fStatus  || op.status===fStatus;
    const mu = !fUrgency || op.urgencyLevel===fUrgency;
    const md = !fDept    || op.department===fDept;
    const mp = !fPersp   || op.perspective===fPersp;
    const mq = !search   || [op.operationTask,op.reportedBy,op.department,op.kpi||'',op.comments||''].some(f=>f.toLowerCase().includes(search));
    return ms&&mu&&md&&mp&&mq;
  });

  list.sort((a,b)=>{
    let va=a[sortCol]??'', vb=b[sortCol]??'';
    if(sortCol==='progress'){va=Number(va);vb=Number(vb);}
    else if(['timeFrame','deadline','createdAt'].includes(sortCol)){va=new Date(va).getTime();vb=new Date(vb).getTime();}
    else {va=va.toString().toLowerCase();vb=vb.toString().toLowerCase();}
    if(va<vb)return sortDir==='asc'?-1:1;
    if(va>vb)return sortDir==='asc'?1:-1;
    return 0;
  });
  return list;
}

// ── TABLE RENDER ─────────────────────────────────────────────────────────
function renderTable() {
  const tbody  = document.getElementById('tableBody');
  const emptyEl= document.getElementById('emptyMsg');
  const list   = getSortedFiltered();

  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = `${list.length} record${list.length!==1?'s':''}`;

  if (list.length===0) { tbody.innerHTML=''; emptyEl.classList.add('visible'); emptyEl.classList.remove('hidden'); return; }
  emptyEl.classList.remove('visible'); emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map(op => {
    const isOverdue = new Date() > new Date(op.deadline) && op.status!=='Completed';
    const pct = Math.min(100, Math.max(0, Number(op.progress)||0));
    const barClass = progressClass(pct);
    const perspKey = op.perspective || 'financial';
    const perspName = PERSPECTIVE_LABELS[perspKey] || perspKey;
    return `
    <tr>
      <td><span class="persp-pill ${perspKey}">${perspName}</span></td>
      <td class="whitespace-nowrap text-xs" style="color:var(--text2)">${fmtDate(op.timeFrame)}</td>
      <td><div style="font-weight:600;font-size:12.5px">${op.reportedBy}</div></td>
      <td><span style="font-size:11.5px;padding:3px 8px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;color:var(--text2);white-space:nowrap">${DIVISION_ABBR[op.department]||op.department}</span></td>
      <td><div class="cell-objective">${op.operationTask}</div></td>
      <td><div class="cell-kpi">${op.kpi||'—'}</div></td>
      <td><span class="badge urgency-${op.urgencyLevel.toLowerCase()}">${op.urgencyLevel}</span></td>
      <td style="min-width:120px">
        <div class="progress-wrap">
          <div class="progress-bar-track"><div class="progress-bar-fill ${barClass}" style="width:${pct}%"></div></div>
          <span class="progress-pct">${pct}%</span>
        </div>
      </td>
      <td><span class="badge status-${op.status.toLowerCase().replace(' ','-')}">${op.status}</span></td>
      <td class="whitespace-nowrap text-xs ${isOverdue?'deadline-red':''}">${isOverdue?'⚠ ':''}${fmtDate(op.deadline)}</td>
      <td><div class="cell-comments">${op.comments||'<span class="cell-no-comments">No comments</span>'}</div></td>
      <td>
        <div style="display:flex;gap:6px">
          <button onclick="editOp('${op.id}')" class="btn-icon edit" title="Edit"><i data-lucide="pencil" style="width:13px;height:13px"></i></button>
          <button onclick="openDeleteModal('${op.id}')" class="btn-icon delete" title="Delete"><i data-lucide="trash-2" style="width:13px;height:13px"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
  lucide.createIcons({ nodes:[tbody] });
}
function applyFilters() { renderTable(); }

// ── PERSPECTIVE TABLE RENDER ──────────────────────────────────────────────
function renderPerspectiveSection(perspKey) {
  const container = document.getElementById(`persp-table-${perspKey}`);
  if (!container) return;

  const ops = operations.filter(o => o.perspective === perspKey);

  // Group by division
  const byDiv = {};
  ops.forEach(op => {
    if (!byDiv[op.department]) byDiv[op.department] = [];
    byDiv[op.department].push(op);
  });

  if (ops.length === 0) {
    container.innerHTML = `<div class="panel" style="padding:40px;text-align:center;color:var(--text3)">
      <p style="font-size:15px;font-weight:600;color:var(--text2);margin-bottom:8px">No objectives logged yet for this perspective</p>
      <p style="font-size:13px">Add objectives using the <strong>Add Objective</strong> form and select this perspective.</p>
    </div>`;
    return;
  }

  container.innerHTML = Object.entries(byDiv).map(([div, divOps]) => `
    <div class="scorecard-perspective" style="margin-bottom:16px">
      <div class="scorecard-div-header">
        <i data-lucide="layers" style="width:14px;height:14px"></i> ${div}
        <span style="margin-left:auto;font-size:11px;font-weight:500;color:var(--text3)">${divOps.length} objective${divOps.length!==1?'s':''}</span>
      </div>
      <div class="scorecard-div-body">
        <table class="sc-table">
          <thead><tr>
            <th>Strategic Objective</th><th>KPI / Measures</th><th>Target</th>
            <th>Progress</th><th>Status</th><th>Deadline</th><th>Actions</th>
          </tr></thead>
          <tbody>${divOps.map(op => {
            const pct = Math.min(100,Math.max(0,Number(op.progress)||0));
            return `<tr>
              <td class="sc-so-cell" style="max-width:220px">${op.operationTask}</td>
              <td class="sc-kpi-cell">${op.kpi||'—'}</td>
              <td class="sc-target-cell">${op.targetTimeline||'—'}</td>
              <td style="min-width:120px">
                <div class="progress-wrap">
                  <div class="progress-bar-track" style="height:6px"><div class="progress-bar-fill ${progressClass(pct)}" style="width:${pct}%"></div></div>
                  <span class="progress-pct">${pct}%</span>
                </div>
              </td>
              <td><span class="badge status-${op.status.toLowerCase().replace(' ','-')}">${op.status}</span></td>
              <td class="whitespace-nowrap" style="font-size:11.5px;color:var(--text2)">${fmtDate(op.deadline)}</td>
              <td>
                <div style="display:flex;gap:5px">
                  <button onclick="editOp('${op.id}')" class="btn-icon edit" title="Edit"><i data-lucide="pencil" style="width:12px;height:12px"></i></button>
                  <button onclick="openDeleteModal('${op.id}')" class="btn-icon delete" title="Delete"><i data-lucide="trash-2" style="width:12px;height:12px"></i></button>
                </div>
              </td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>
    </div>`).join('');
  lucide.createIcons({ nodes:[container] });
}

// ── SCORECARD RENDER (PDF data) ───────────────────────────────────────────
function soKey(perspKey, divName, so) {
  // Unique stable key for each scorecard SO
  return `${perspKey}__${divName}__${so}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}

function renderScorecard() {
  const grid = document.getElementById('scorecardGrid');
  if (!grid) return;

  grid.innerHTML = Object.entries(SCORECARD_DATA).map(([perspKey, perspData]) => {
    const divHtml = Object.entries(perspData.divisions).map(([divName, rows]) => `
      <div class="scorecard-division">
        <div class="scorecard-div-header" onclick="toggleDivBody(this)">
          <i data-lucide="chevron-down" style="width:13px;height:13px;transition:transform .2s"></i>
          ${divName}
          <span style="margin-left:auto;font-size:11px;font-weight:500;color:var(--text3)">${rows.length} SOs</span>
        </div>
        <div class="scorecard-div-body">
          <table class="sc-table">
            <thead><tr>
              <th style="min-width:90px">SO #</th>
              <th style="min-width:190px">Strategic Objective</th>
              <th style="min-width:180px">KPI / Measures</th>
              <th style="min-width:160px">Target / Timeline</th>
              <th style="min-width:180px">Expected Outcome</th>
              <th style="min-width:180px">Corrective Actions</th>
              <th style="min-width:200px">Progress</th>
              <th style="min-width:130px">Status</th>
              <th style="min-width:180px">Comments / Updates</th>
              <th style="min-width:80px">Save</th>
            </tr></thead>
            <tbody>
              ${rows.map(r => {
                const key = soKey(perspKey, divName, r.so);
                const saved = scorecardProgress[key] || {};
                const pct = Number(saved.progress) || 0;
                const barClass = progressClass(pct);
                const status = saved.status || 'Pending';
                const comments = saved.comments || '';
                return `
              <tr>
                <td><span class="sc-so-id">${r.so}</span></td>
                <td class="sc-so-cell">${r.title}</td>
                <td class="sc-kpi-cell">${r.kpi}</td>
                <td class="sc-target-cell">${r.target}</td>
                <td class="sc-outcome-cell">${r.outcome}</td>
                <td class="sc-corrective-cell">${r.corrective}</td>
                <td style="min-width:200px">
                  <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                    <span class="sc-progress-pct" id="pct-${key}" style="font-size:12px;font-weight:700;font-family:'DM Mono',monospace;color:var(--fin);min-width:34px">${pct}%</span>
                  </div>
                  <div class="progress-bar-track" style="margin-bottom:6px">
                    <div class="progress-bar-fill ${barClass}" id="bar-${key}" style="width:${pct}%"></div>
                  </div>
                  <input type="range" min="0" max="100" value="${pct}"
                    class="range-slider sc-range"
                    oninput="scSyncProgress(this,'${key}')"
                    style="width:100%">
                </td>
                <td>
                  <select class="sc-status-select form-input" id="stat-${key}" style="font-size:12px;padding:5px 8px">
                    <option${status==='Pending'?' selected':''}>Pending</option>
                    <option${status==='In Progress'?' selected':''}>In Progress</option>
                    <option${status==='Completed'?' selected':''}>Completed</option>
                    <option${status==='Delayed'?' selected':''}>Delayed</option>
                  </select>
                </td>
                <td>
                  <textarea id="com-${key}" class="form-input sc-comments-input"
                    placeholder="Add updates, blockers…"
                    style="font-size:12px;height:64px;resize:vertical">${comments}</textarea>
                </td>
                <td>
                  <button onclick="saveScorecardProgress('${key}')"
                    class="btn-primary" style="padding:6px 12px;font-size:12px;white-space:nowrap"
                    title="Save progress">
                    <i data-lucide="save" style="width:13px;height:13px"></i> Save
                  </button>
                </td>
              </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`).join('');

    return `
    <div class="scorecard-perspective">
      <div class="scorecard-persp-header ${perspKey}" onclick="toggleScorecard(this)">
        <span>${perspData.label}</span>
        <span>${Object.values(perspData.divisions).reduce((a,d)=>a+d.length,0)} Strategic Objectives ▾</span>
      </div>
      <div class="scorecard-divisions">${divHtml}</div>
    </div>`;
  }).join('');

  lucide.createIcons({ nodes:[grid] });
}

// ── SCORECARD PROGRESS INLINE HELPERS ────────────────────────────────────
function scSyncProgress(input, key) {
  const val = parseInt(input.value) || 0;
  const pctEl = document.getElementById(`pct-${key}`);
  const barEl = document.getElementById(`bar-${key}`);
  if (pctEl) pctEl.textContent = val + '%';
  if (barEl) {
    barEl.style.width = val + '%';
    barEl.className = `progress-bar-fill ${progressClass(val)}`;
  }
  // Auto-set status
  const statEl = document.getElementById(`stat-${key}`);
  if (statEl) {
    if (val === 100) statEl.value = 'Completed';
    else if (val > 0 && statEl.value === 'Completed') statEl.value = 'In Progress';
    else if (val > 0 && statEl.value === 'Pending') statEl.value = 'In Progress';
  }
}

async function saveScorecardProgress(key) {
  const pctInput = document.querySelector(`.sc-range[oninput*="${key}"]`);
  const statEl   = document.getElementById(`stat-${key}`);
  const comEl    = document.getElementById(`com-${key}`);
  if (!pctInput || !statEl) return;

  const progress = parseInt(pctInput.value) || 0;
  const status   = statEl.value;
  const comments = comEl ? comEl.value.trim() : '';

  const data = { progress, status, comments, updatedAt: new Date().toISOString() };
  try {
    await window.db.set(window.db.ref(window.db_instance, `scorecard-progress/${key}`), data);
    scorecardProgress[key] = data;
    showMsg('Progress saved!');
  } catch(err) {
    showMsg('Error saving: ' + err.message, 'error');
  }
}

function toggleScorecard(header) {
  const divs = header.nextElementSibling;
  if (!divs) return;
  const hidden = divs.style.display === 'none';
  divs.style.display = hidden ? '' : 'none';
  const span = header.querySelector('span:last-child');
  if (span) span.textContent = span.textContent.replace(hidden?'▸':'▾', hidden?'▾':'▸');
}

function toggleDivBody(header) {
  const body = header.nextElementSibling;
  if (!body) return;
  const hidden = body.style.display === 'none';
  body.style.display = hidden ? '' : 'none';
  const icon = header.querySelector('i');
  if (icon) icon.style.transform = hidden ? 'rotate(0deg)' : 'rotate(-90deg)';
}

// ── STATS ────────────────────────────────────────────────────────────────
function updateStats() {
  const total     = operations.length;
  const inProg    = operations.filter(o=>o.status==='In Progress').length;
  const completed = operations.filter(o=>o.status==='Completed').length;
  const delayed   = operations.filter(o=>o.status==='Delayed').length;
  const pending   = operations.filter(o=>o.status==='Pending').length;
  const rate      = total>0 ? Math.round((completed/total)*100) : 0;

  ['statTotal','statProgress','statCompleted','statDelayed','statPending'].forEach((id,i)=>{
    const el=document.getElementById(id); if(el) el.textContent=[total,inProg,completed,delayed,pending][i];
  });
  const srEl = document.getElementById('statRate'); if(srEl) srEl.textContent = rate+'%';

  ['mStatTotal','mStatProgress','mStatCompleted','mStatDelayed','mStatPending'].forEach((id,i)=>{
    const el=document.getElementById(id); if(el) el.textContent=[total,inProg,completed,delayed,pending][i];
  });
  const mrEl = document.getElementById('mStatRate'); if(mrEl) mrEl.textContent = rate+'%';

  // Alert strip
  const alertStrip = document.getElementById('alertStrip'), alertMsg = document.getElementById('alertMsg');
  if (alertStrip && alertMsg) {
    const critical = operations.filter(o=>o.urgencyLevel==='Critical'&&o.status!=='Completed');
    if (delayed>0||critical.length>0) {
      alertStrip.classList.remove('hidden');
      const parts=[];
      if(delayed>0) parts.push(`${delayed} delayed objective${delayed>1?'s':''}`);
      if(critical.length>0) parts.push(`${critical.length} critical item${critical.length>1?'s':''} pending`);
      alertMsg.textContent = parts.join(' · ') + ' — review required';
    } else alertStrip.classList.add('hidden');
  }

  // Perspective cards
  const perspKeys = ['financial','learning','internal','customer'];
  perspKeys.forEach(pk => {
    const ops = operations.filter(o=>o.perspective===pk);
    const done= ops.filter(o=>o.status==='Completed').length;
    const r   = ops.length>0 ? Math.round((done/ops.length)*100) : 0;
    const pcEl= document.getElementById(`pc-${pk}`); if(pcEl) pcEl.textContent = `${ops.length} objective${ops.length!==1?'s':''}`;
    const prEl= document.getElementById(`pr-${pk}`); if(prEl) prEl.textContent = r+'%';
    const nbEl= document.getElementById(`nb-${pk}`); if(nbEl) nbEl.textContent = ops.length;
  });

  updateCriticalList();
  updateRecentList();
}

// ── CRITICAL & RECENT ────────────────────────────────────────────────────
function updateCriticalList() {
  const container = document.getElementById('criticalList'); if(!container) return;
  const items = operations.filter(o=>(o.urgencyLevel==='Critical'||o.status==='Delayed')&&o.status!=='Completed').slice(0,6);
  if (items.length===0) { container.innerHTML='<div class="panel-empty">No critical items 🎉</div>'; return; }
  container.innerHTML = items.map(op=>`
    <div class="panel-item" onclick="showSection('objectives',null)">
      <div class="panel-item-dot" style="background:${op.status==='Delayed'?'var(--red)':'#ef4444'}"></div>
      <div>
        <div class="panel-item-title">${op.operationTask}</div>
        <div class="panel-item-meta">
          <span>${DIVISION_ABBR[op.department]||op.department}</span><span>·</span>
          <span class="badge urgency-${op.urgencyLevel.toLowerCase()}">${op.urgencyLevel}</span><span>·</span>
          <span class="badge status-${op.status.toLowerCase().replace(' ','-')}">${op.status}</span>
        </div>
      </div>
    </div>`).join('');
}

function updateRecentList() {
  const container = document.getElementById('recentList'); if(!container) return;
  const items = [...operations].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
  if (items.length===0) { container.innerHTML='<div class="panel-empty">No objectives yet</div>'; return; }
  container.innerHTML = items.map(op=>{
    const pct=Number(op.progress)||0;
    return `<div class="panel-item">
      <div class="panel-item-dot" style="background:var(--fin)"></div>
      <div style="flex:1;min-width:0">
        <div class="panel-item-title">${op.operationTask}</div>
        <div class="panel-item-meta"><span>${op.reportedBy}</span><span>·</span><span>${DIVISION_ABBR[op.department]||op.department}</span><span>·</span><span class="persp-pill ${op.perspective||'financial'}">${PERSPECTIVE_LABELS[op.perspective]||'Financial'}</span></div>
        <div class="progress-wrap" style="margin-top:5px">
          <div class="progress-bar-track" style="height:4px"><div class="progress-bar-fill ${progressClass(pct)}" style="width:${pct}%"></div></div>
          <span class="progress-pct">${pct}%</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── CHART VIEW TOGGLE ────────────────────────────────────────────────────
function setChartView(view, btn) {
  chartView = view;
  document.querySelectorAll('.chart-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  updateWeeklyChart();
}

// ── CHARTS ───────────────────────────────────────────────────────────────
function updateWeeklyChart() {
  const days = chartView==='monthly'?30:7;
  const today= new Date();
  const weekData={};
  for(let i=days-1;i>=0;i--){
    const d=new Date(today); d.setDate(d.getDate()-i);
    const key=chartView==='monthly'
      ? d.toLocaleDateString('en-US',{month:'short',day:'numeric'})
      : d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
    weekData[key]={pending:0,progress:0,completed:0,delayed:0};
  }
  operations.forEach(op=>{
    const d=new Date(op.createdAt);
    const key=chartView==='monthly'
      ? d.toLocaleDateString('en-US',{month:'short',day:'numeric'})
      : d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
    if(!weekData[key])return;
    if(op.status==='Pending') weekData[key].pending++;
    else if(op.status==='In Progress') weekData[key].progress++;
    else if(op.status==='Completed')   weekData[key].completed++;
    else if(op.status==='Delayed')     weekData[key].delayed++;
  });
  const labels=Object.keys(weekData);
  const c=getChartColors();
  const ctx=document.getElementById('progressChart'); if(!ctx)return;
  const opts={
    responsive:true,maintainAspectRatio:false,
    scales:{
      x:{stacked:true,grid:{display:false},ticks:{color:c.text,font:{size:11}}},
      y:{stacked:true,beginAtZero:true,ticks:{stepSize:1,color:c.text,font:{size:11}},grid:{color:c.grid}}
    },
    plugins:{legend:{position:'top',labels:{padding:14,font:{size:12},color:c.text}}}
  };
  if(!chartInitialized||!progressChart){
    progressChart=new Chart(ctx,{type:'bar',data:{labels,datasets:[
      {label:'Pending',   data:Object.values(weekData).map(d=>d.pending),   backgroundColor:'#f1f5f9',borderColor:'#94a3b8',borderWidth:1},
      {label:'In Progress',data:Object.values(weekData).map(d=>d.progress), backgroundColor:'#93c5fd',borderColor:'#3b82f6',borderWidth:1},
      {label:'Completed', data:Object.values(weekData).map(d=>d.completed), backgroundColor:'#6ee7b7',borderColor:'#10b981',borderWidth:1},
      {label:'Delayed',   data:Object.values(weekData).map(d=>d.delayed),   backgroundColor:'#fca5a5',borderColor:'#ef4444',borderWidth:1}
    ]},options:opts});
    chartInitialized=true;
  } else {
    progressChart.data.labels=labels;
    const vals=Object.values(weekData);
    progressChart.data.datasets[0].data=vals.map(d=>d.pending);
    progressChart.data.datasets[1].data=vals.map(d=>d.progress);
    progressChart.data.datasets[2].data=vals.map(d=>d.completed);
    progressChart.data.datasets[3].data=vals.map(d=>d.delayed);
    progressChart.update('active');
  }
}

function updateDonutChart() {
  const counts={Pending:0,'In Progress':0,Completed:0,Delayed:0};
  operations.forEach(o=>{if(counts[o.status]!==undefined)counts[o.status]++;});
  const c=getChartColors();
  const ctx=document.getElementById('donutChart'); if(!ctx)return;
  const data={labels:Object.keys(counts),datasets:[{data:Object.values(counts),backgroundColor:['#94a3b8','#3b82f6','#10b981','#ef4444'],borderWidth:2,borderColor:c.bg}]};
  if(!donutChart){
    donutChart=new Chart(ctx,{type:'doughnut',data,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:12,font:{size:11},color:c.text}}},cutout:'65%'}});
  } else { donutChart.data=data; donutChart.update('active'); }
}

function updateDeptChart() {
  const depts={};
  operations.forEach(op=>{ depts[op.department]=(depts[op.department]||0)+1; });
  const c=getChartColors();
  const ctx=document.getElementById('deptChart'); if(!ctx)return;
  const labels=Object.keys(depts).map(d=>DIVISION_ABBR[d]||d);
  const data={labels,datasets:[{label:'Objectives',data:Object.values(depts),backgroundColor:'#1d6fa4',borderRadius:6}]};
  if(!deptChart){
    deptChart=new Chart(ctx,{type:'bar',data,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:c.text,font:{size:11}}},y:{beginAtZero:true,ticks:{stepSize:1,color:c.text},grid:{color:c.grid}}}}});
  } else { deptChart.data=data; deptChart.update('active'); }
}

function updateUrgencyChart() {
  const counts={Low:0,Medium:0,High:0,Critical:0};
  operations.forEach(op=>{if(counts[op.urgencyLevel]!==undefined)counts[op.urgencyLevel]++;});
  const c=getChartColors();
  const ctx=document.getElementById('urgencyChart'); if(!ctx)return;
  const data={labels:Object.keys(counts),datasets:[{data:Object.values(counts),backgroundColor:['#3b82f6','#f59e0b','#f97316','#ef4444'],borderWidth:2,borderColor:c.bg}]};
  if(!urgencyChart){
    urgencyChart=new Chart(ctx,{type:'pie',data,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:12,font:{size:11},color:c.text}}}}});
  } else { urgencyChart.data=data; urgencyChart.update('active'); }
}

function updateAvgProgressChart() {
  const depts={};
  operations.forEach(op=>{ if(!depts[op.department])depts[op.department]=[]; depts[op.department].push(Number(op.progress)||0); });
  const avgByDept={};
  Object.keys(depts).forEach(d=>{ avgByDept[DIVISION_ABBR[d]||d]=Math.round(depts[d].reduce((a,b)=>a+b,0)/depts[d].length); });
  const c=getChartColors();
  const ctx=document.getElementById('avgProgressChart'); if(!ctx)return;
  const data={labels:Object.keys(avgByDept),datasets:[{label:'Avg Progress %',data:Object.values(avgByDept),backgroundColor:Object.values(avgByDept).map(v=>v>=75?'#10b981':v>=40?'#f59e0b':'#ef4444'),borderRadius:6}]};
  if(!avgProgressChart){
    avgProgressChart=new Chart(ctx,{type:'bar',data,options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`${ctx.raw}%`}}},scales:{x:{max:100,ticks:{callback:v=>v+'%',color:c.text},grid:{color:c.grid}},y:{ticks:{color:c.text,font:{size:11}},grid:{display:false}}}}});
  } else { avgProgressChart.data=data; avgProgressChart.update('active'); }
}

function updatePerspChart() {
  const counts={financial:0,learning:0,internal:0,customer:0};
  operations.forEach(op=>{if(counts[op.perspective]!==undefined)counts[op.perspective]++;});
  const c=getChartColors();
  const ctx=document.getElementById('perspChart'); if(!ctx)return;
  const data={
    labels:['Financial','Learning & Growth','Internal Process','Customer Satisfaction'],
    datasets:[{data:Object.values(counts),backgroundColor:['#1d6fa4','#7c3aed','#0891b2','#059669'],borderWidth:2,borderColor:c.bg}]
  };
  if(!perspChart){
    perspChart=new Chart(ctx,{type:'doughnut',data,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:10,font:{size:10},color:c.text}}},cutout:'55%'}});
  } else { perspChart.data=data; perspChart.update('active'); }
}

function updatePerspStatusChart() {
  const perspKeys=['financial','learning','internal','customer'];
  const perspLabels=['Financial','Learning','Internal','Customer'];
  const statuses=['Completed','In Progress','Pending','Delayed'];
  const statusColors=['#10b981','#3b82f6','#94a3b8','#ef4444'];
  const c=getChartColors();
  const ctx=document.getElementById('perspStatusChart'); if(!ctx)return;

  const datasets=statuses.map((s,i)=>({
    label:s,
    data:perspKeys.map(pk=>operations.filter(o=>o.perspective===pk&&o.status===s).length),
    backgroundColor:statusColors[i], borderRadius:4
  }));
  const data={labels:perspLabels,datasets};
  if(!perspStatusChart){
    perspStatusChart=new Chart(ctx,{type:'bar',data,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{padding:12,font:{size:11},color:c.text}}},scales:{x:{stacked:true,grid:{display:false},ticks:{color:c.text,font:{size:11}}},y:{stacked:true,beginAtZero:true,ticks:{stepSize:1,color:c.text},grid:{color:c.grid}}}}});
  } else { perspStatusChart.data=data; perspStatusChart.update('active'); }
}

// ── CRUD ─────────────────────────────────────────────────────────────────
function editOp(id) {
  const op=operations.find(o=>o.id===id); if(!op)return;
  editingId=id;
  document.getElementById('perspective').value   = op.perspective    || 'financial';
  document.getElementById('timeFrame').value     = op.timeFrame;
  document.getElementById('reportedBy').value    = op.reportedBy;
  document.getElementById('department').value    = op.department;
  document.getElementById('operationTask').value = op.operationTask;
  document.getElementById('kpi').value           = op.kpi||'';
  document.getElementById('targetTimeline').value= op.targetTimeline||'';
  document.getElementById('expectedOutcome').value= op.expectedOutcome||'';
  document.getElementById('urgencyLevel').value  = op.urgencyLevel;
  document.getElementById('status').value        = op.status;
  document.getElementById('deadline').value      = op.deadline;
  document.getElementById('comments').value      = op.comments||'';
  syncProgress(op.progress);
  document.getElementById('formTitle').textContent='Edit Strategic Objective';
  document.getElementById('submitLabel').textContent='Update Objective';
  document.getElementById('formIcon').setAttribute('data-lucide','pencil');
  document.getElementById('cancelBtn').classList.remove('hidden');
  document.getElementById('formCard').classList.add('editing');
  lucide.createIcons();
  showSection('add',null);
  document.getElementById('formCard').scrollIntoView({behavior:'smooth',block:'start'});
}

async function deleteOp(id) {
  try {
    await window.db.remove(window.db.ref(window.db_instance,`mancom-operations/${id}`));
    showMsg('Objective deleted','info');
  } catch(err) { showMsg('Error: '+err.message,'error'); }
  closeDeleteModal();
}

function exportExcel() {
  if(operations.length===0){showMsg('No data to export','error');return;}
  const header=['Perspective','Time Frame','Reported By','Division','Strategic Objective','KPI / Measures','Target / Timeline','Expected Outcome','Urgency','Progress (%)','Status','Deadline','Corrective Actions / Comments'].map(csvField).join(',');
  const rows=operations.map(op=>[
    csvField(PERSPECTIVE_LABELS[op.perspective]||op.perspective),
    csvField(fmtDateFull(op.timeFrame)),csvField(op.reportedBy),csvField(op.department),
    csvField(op.operationTask),csvField(op.kpi||''),csvField(op.targetTimeline||''),
    csvField(op.expectedOutcome||''),csvField(op.urgencyLevel),csvField(op.progress),
    csvField(op.status),csvField(fmtDateFull(op.deadline)),csvField(op.comments||'')
  ].join(','));
  const csv=[header,...rows].join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url; link.download=`scmc-objectives-${new Date().toISOString().split('T')[0]}.csv`;
  link.click(); URL.revokeObjectURL(url);
  showMsg('Exported successfully!');
}

function resetForm() {
  document.getElementById('opForm').reset();
  syncProgress(0);
  setDefaultDates();
  document.getElementById('formTitle').textContent='Add New Strategic Objective';
  document.getElementById('submitLabel').textContent='Add Objective';
  document.getElementById('formIcon').setAttribute('data-lucide','file-plus');
  document.getElementById('cancelBtn').classList.add('hidden');
  document.getElementById('formCard').classList.remove('editing');
  lucide.createIcons();
  editingId=null;
}

// ── DEBOUNCED RENDER ─────────────────────────────────────────────────────
function scheduleRender() {
  clearTimeout(renderDebounce);
  renderDebounce=setTimeout(()=>{
    renderTable(); updateStats(); updateWeeklyChart(); updateDonutChart();
    if(['financial','learning','internal','customer'].includes(currentSection)) renderPerspectiveSection(currentSection);
    if(currentSection==='scorecard') renderScorecard();
    if(currentSection==='analytics') { updateDeptChart(); updateUrgencyChart(); updateAvgProgressChart(); updatePerspChart(); updatePerspStatusChart(); }
  },250);
}

// ── OVERDUE CHECK ────────────────────────────────────────────────────────
async function checkAndUpdateOverdueOperations() {
  const now=new Date();
  for(const op of operations){
    const needsDelay=new Date(op.deadline)<now&&op.progress<100&&op.status!=='Completed'&&op.status!=='Delayed';
    if(!needsDelay)continue;
    try { await window.db.set(window.db.ref(window.db_instance,`mancom-operations/${op.id}`),{...op,status:'Delayed'}); }
    catch(err){console.error('Auto-delay error:',err);}
  }
}

// ── OFFLINE DETECTION ────────────────────────────────────────────────────
function initOfflineDetection() {
  if(!window.db||!window.db_instance)return;
  window.db.onValue(window.db.ref(window.db_instance,'.info/connected'),snap=>{
    const online=snap.val()===true;
    document.getElementById('offlineBanner').classList.toggle('hidden',online);
    const cs=document.getElementById('connStatus');
    if(cs){ cs.classList.toggle('offline',!online); cs.querySelector('.conn-label').textContent=online?'Live':'Offline'; }
  });
}

// ── MAIN INIT ─────────────────────────────────────────────────────────────
window.initDashboard = function() {
  if(window.dashboardInitialized)return;
  window.dashboardInitialized=true;

  initDarkMode();
  setDefaultDates();
  initOfflineDetection();
  renderScorecard();

  document.getElementById('confirmDeleteBtn').addEventListener('click',()=>{ if(deleteTargetId)deleteOp(deleteTargetId); });

  // Firebase real-time listener — operations
  window.db.onValue(
    window.db.ref(window.db_instance,'mancom-operations'),
    snapshot=>{
      operations=snapshot.exists()
        ? Object.values(snapshot.val()).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
        : [];
      const ol=document.getElementById('loadingOverlay'); if(ol)ol.style.display='none';
      scheduleRender();
      checkAndUpdateOverdueOperations();
    },
    err=>{ console.error('Firebase error:',err); const ol=document.getElementById('loadingOverlay'); if(ol)ol.style.display='none'; showMsg('Database connection error','error'); }
  );

  // Firebase real-time listener — scorecard progress
  window.db.onValue(
    window.db.ref(window.db_instance,'scorecard-progress'),
    snapshot=>{
      scorecardProgress = snapshot.exists() ? snapshot.val() : {};
      if(currentSection==='scorecard') renderScorecard();
    }
  );

  setInterval(checkAndUpdateOverdueOperations,60000);

  // Form submit
  document.getElementById('opForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const progress=Math.min(100,Math.max(0,parseInt(document.getElementById('progress').value)||0));
    let status=document.getElementById('status').value;
    const newDeadline=document.getElementById('deadline').value;
    const now=new Date();
    if(progress===100)status='Completed';
    else if(progress<100&&status==='Completed')status='In Progress';
    else if(new Date(newDeadline)<now&&status!=='Completed')status='Delayed';
    else if(new Date(newDeadline)>now&&status==='Delayed')status='In Progress';

    const existingOp=editingId?operations.find(o=>o.id===editingId):null;
    const op={
      id:           editingId||null,
      perspective:  document.getElementById('perspective').value,
      timeFrame:    document.getElementById('timeFrame').value,
      reportedBy:   document.getElementById('reportedBy').value.trim(),
      department:   document.getElementById('department').value,
      operationTask:document.getElementById('operationTask').value.trim(),
      kpi:          document.getElementById('kpi').value.trim(),
      targetTimeline:document.getElementById('targetTimeline').value.trim(),
      expectedOutcome:document.getElementById('expectedOutcome').value.trim(),
      urgencyLevel: document.getElementById('urgencyLevel').value,
      progress, status,
      deadline:     newDeadline,
      comments:     document.getElementById('comments').value.trim(),
      createdAt:    existingOp?.createdAt||new Date().toISOString()
    };

    const btn=document.getElementById('submitBtn');
    btn.disabled=true; btn.style.opacity='.7';
    try {
      if(editingId){
        await window.db.set(window.db.ref(window.db_instance,`mancom-operations/${editingId}`),{...op,id:editingId});
        showMsg('Objective updated!');
      } else {
        const newRef=window.db.push(window.db.ref(window.db_instance,'mancom-operations'));
        await window.db.set(newRef,{...op,id:newRef.key});
        showMsg('Objective added!');
      }
      resetForm();
      showSection('objectives',null);
    } catch(err){ showMsg('Error saving: '+err.message,'error'); }
    finally{ btn.disabled=false; btn.style.opacity=''; }
  });

  document.getElementById('cancelBtn').addEventListener('click',()=>{ resetForm(); showSection('dashboard',null); });

  // Clock
  const tick=()=>{
    const t=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const ce=document.getElementById('currentTime'); if(ce)ce.textContent=t;
    const cm=document.getElementById('currentTimeMobile'); if(cm)cm.textContent=t;
  };
  tick(); setInterval(tick,1000);
  lucide.createIcons();
};

// ── BOOT ──────────────────────────────────────────────────────────────────
window.addEventListener('load',()=>{
  if(window.isReady) window.initDashboard();
  else setTimeout(()=>window.initDashboard?.(),1500);
});
