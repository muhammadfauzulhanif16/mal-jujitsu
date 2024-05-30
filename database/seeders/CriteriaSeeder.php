<?php
  
  namespace Database\Seeders;
  
  use App\Models\Criteria;
  use App\Models\SubCriteria;
  use App\Models\SubSubCriteria;
  use Illuminate\Database\Seeder;
  
  class CriteriaSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $criterias = [
        [
          'criteria' => 'Etika',
          'sub-criterias' => [
            [
              'sub-criteria' => 'Kedisiplinan',
              'sub-sub-criterias' => [
                'Kehadiran selama pelatihan',
                'Waktu kedatangan saat latihan',
              ],
            ],
            [
              'sub-criteria' => 'Perilaku',
              'sub-sub-criterias' => [
                'Sikap ketika pelatih memberikan materi',
                'Sikap ketika melakukan teknik/materi yang diperintahkan',
              ],
            ],
          ],
        ],
        [
          'criteria' => 'Teknik Bertanding',
          'sub-criterias' => [
            [
              'sub-criteria' => 'Ne-Waza',
              'sub-sub-criterias' => [
                'Takedown',
                'Passing guard',
                'Position control',
                'Sweep',
                'Submission',
                'Escape position/submission',
              ],
            ],
            [
              'sub-criteria' => 'Fighting',
              'sub-sub-criterias' => [
                'Pukulan',
                'Tendangan',
                'Tangkasan',
                'Footwork',
                'Takedown',
                'Passing guard',
                'Position control',
                'Sweep',
                'Submission',
                'Escape position/submission',
              ],
            ],
          ],
        ],
        [
          'criteria' => 'Fisik',
          'sub-criterias' => [
            [
              'sub-criteria' => 'Power',
              'sub-sub-criterias' => [
                'Standing board jump',
                'Vertical jump',
              ],
            ],
            [
              'sub-criteria' => 'Flexibility',
              'sub-sub-criterias' => [
                'Sit and react test',
                'Split flex',
              ],
            ],
            [
              'sub-criteria' => 'Speed',
              'sub-sub-criterias' => [
                '20 meter speed test',
                '30 meter speed test',
              ],
            ],
            [
              'sub-criteria' => 'Agility',
              'sub-sub-criterias' => [
                'Shuttle run',
                '4 cone agility test',
              ],
            ],
            [
              'sub-criteria' => 'Muscle Strenght',
              'sub-sub-criterias' => [
                'Push up',
                'Sit up',
                'Wall sit',
                'Bodyweight squad',
                'Core strength',
              ],
            ],
            [
              'sub-criteria' => 'VO2MAX',
              'sub-sub-criterias' => [
                'Sprint 100m',
                'Bleep Test',
              ],
            ],
          ],
        ],
      ];
      
      foreach ($criterias as $criteria) {
        $criteriaModel = Criteria::create(['name' => $criteria['criteria']]);
        
        foreach ($criteria['sub-criterias'] as $subCriteria) {
          $subCriteriaData = ['name' => $subCriteria['sub-criteria'], 'criteria_id' => $criteriaModel->id];
          $subCriteriaModel = SubCriteria::create($subCriteriaData);
          
          foreach ($subCriteria['sub-sub-criterias'] as $subSubCriteria) {
            $subSubCriteriaData = ['name' => $subSubCriteria, 'sub_criteria_id' => $subCriteriaModel->id];
            SubSubCriteria::create($subSubCriteriaData);
          }
        }
      }
    }
  }
