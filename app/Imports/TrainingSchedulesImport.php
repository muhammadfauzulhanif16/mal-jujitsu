<?php
  
  namespace App\Imports;
  
  use App\Models\TrainingSchedule;
  use Carbon\Carbon;
  use Illuminate\Database\Eloquent\Model;
  use Maatwebsite\Excel\Concerns\Importable;
  use Maatwebsite\Excel\Concerns\ToModel;
  use Maatwebsite\Excel\Concerns\WithHeadingRow;
  use PhpOffice\PhpSpreadsheet\Shared\Date;
  
  class TrainingSchedulesImport implements ToModel, WithHeadingRow
  {
    use Importable;
    
    /**
     * @param array $row
     *
     * @return Model|null
     */
    public function model(array $row)
    {
      // Convert Excel date to Carbon date
      $date = Carbon::instance(Date::excelToDateTimeObject($row['tanggal']));
      
      return new TrainingSchedule([
        'date' => $date,
        'description' => $row['deskripsi'],
      ]);
    }
  }
