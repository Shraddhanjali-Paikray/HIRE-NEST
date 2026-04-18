import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

const toNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? null : num;
};
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const UserId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !jobType ||
      !companyId ||
      salary === undefined ||
      position === undefined
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const parsedSalary = toNumber(salary);
    const parsedExperience = toNumber(experience);
    const parsedPosition = toNumber(position);
    if (parsedSalary === null || parsedPosition === null) {
      return res.status(400).json({
        message: "Salary and Position must be valid numbers",
        success: false,
      });
    }
    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((r) => r.trim());
    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: parsedSalary,
      location,
      jobType,
      experienceLevel: parsedExperience || 0,
      position: parsedPosition,
      company: companyId,
      created_by: UserId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};